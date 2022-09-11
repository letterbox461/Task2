import {
  Codec,
  connect,
  Msg,
  NatsConnection,
  StringCodec,
  Subscription,
} from "nats";

import NatsError from "./src/errors/nats-error";

export default class Nats {
  private nc!: NatsConnection;
  private sc!: Codec<string>;
  private serverAddress: string;
  constructor(serverAddress: string) {
    this.sc = StringCodec();
    this.serverAddress = serverAddress;
  }
  public async request(sub: string, data: { id: number }): Promise<string> {
    const reply = await this.nc.request(
      sub,
      this.sc.encode(JSON.stringify(data))
    );
    return this.sc.decode(reply.data);
  }

  public async close(): Promise<void> {
    await this.nc.drain();
  }

  public async connect(): Promise<void> {
    try {
      this.nc = await connect({ servers: this.serverAddress });
      console.log("NATS Server Connected");
    } catch (err) {
      console.log(err);
      throw NatsError.FailedToConnect();
    }
  }

  public async createService(subscription: string, callback: Function) {
    const sub: Subscription = this.nc.subscribe(subscription);
    console.log(`NATS Service listening for messages`);
    for await (const m of sub) {
      try {
        const data: string = await callback(this.sc.decode(m.data));
        m.respond(this.sc.encode(data));
      } catch (err: any) {
        console.log(err);
        m.respond(
          this.sc.encode(
            JSON.stringify({ result: "error", message: err.message })
          )
        );
      }
    }
  }
}

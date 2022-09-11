import TestRepository from "../models/database/repository/TestRepository";
import Nats from "../../../messageBroker";

class TestController {
  public async test(): Promise<void> {
    const sub: string = process.env.NATS_SUB || "test";
    const natsAddress: string = process.env.NATS_ADDRESS || "localhost:4222";
    const nats = new Nats(natsAddress);
    await nats.connect();
    nats.createService(sub, TestRepository.find);
  }
}

export default new TestController();

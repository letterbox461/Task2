import Nats from "../../../messageBroker";
import Hapi from "@hapi/hapi";

interface ITest {
  userId: number;
}
type Decorate<T> = T & Hapi.Request;
type TestRequest = { query: Decorate<ITest> };

class TestController {
  public async test(request: TestRequest) {
    const { query } = request;

    const id = query.userId;

    const nats = new Nats(process.env.NATS_ADDRESS || "localhost:4222");
    await nats.connect();
    const reply = await nats.request(process.env.NATS_SUB || "test", {
      id: id,
    });
    nats.close();
    return reply;
  }
}

export default new TestController();

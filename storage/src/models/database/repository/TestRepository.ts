import { Repository } from "typeorm/repository/Repository";
import dataSource from "../../../../ormconfig";

import Test from "../entity/test";

class TestRepository {
  private testRepo: Repository<Test>;

  constructor() {
    this.testRepo = dataSource.getRepository(Test);
  }

  public find = async (data: string) => {
    const id: number = JSON.parse(data).id;
    let response = await this.testRepo.findOne({ where: { id: id } });

    return JSON.stringify(response);
  };
}

export default new TestRepository();

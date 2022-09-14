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

  public addUsers = async () => {
    const users: Test[] = [
      { firstName: "Thomas", lastName: "Anderson", id: 1 },
      { firstName: "Tyler", lastName: "Durden", id: 2 },
      { firstName: "Boris", lastName: "The blade", id: 3 },
    ];
    await this.testRepo.save(users);
  };
}

export default new TestRepository();

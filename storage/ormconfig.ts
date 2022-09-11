import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: true,
  cache: false,
  logging: false,
  entities: [`${__dirname}/src/models/database/entity/**/*{.ts,.js}`],
  migrations: [`${__dirname}./src/models/database/migrations/**/*{.ts,.js}`],
});

import dotEnv from "dotenv";
import path from "path";
dotEnv.config({ path: path.join(__dirname, "..", ".env") });
import TestController from "./src/controllers/test";

import dataSource from "./ormconfig";
import DBError from "./src/errors/db-error";

(async () => {
  try {
    await dataSource.initialize();
    console.log("DB initialized");
  } catch (err) {
    console.log(err);
    throw DBError.InitializeFailed();
  }
  try {
    await dataSource.runMigrations();
  } catch (e) {
    console.log(e);
  }
  TestController.test();
})();

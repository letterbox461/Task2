import app from "./src/server";
import Dotenv from "dotenv";
import path from "path";

(async () => {
  Dotenv.config({ path: path.join(__dirname, "..", ".env") });
  await app.start();
})();

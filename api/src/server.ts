import Hapi from "@hapi/hapi";
import hapiswagger from "hapi-swagger";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Router from "./routes";
import path from "path";

class App {
  private server!: Hapi.Server;

  private async addPlugins() {
    this.server.register({
      plugin: hapiswagger,
      options: {
        info: {
          title: "API Documentation",
          description: "API Documentation",
        },
        jsonPath: "/documentation.json",
        documentationPath: "/documentation",
        schemes: ["http", "https"],
        debug: true,
        securityDefinitions: {
          Bearer: {
            type: "apiKey",
          },
        },
      },
    });
    this.server.register([Inert, Vision]);
  }

  private async initServer() {
    this.server = Hapi.server({
      port: process.env.PORT || 5000,

      routes: {
        cors: {
          origin: ["*"],
        },
        // files: {
        //   relativeTo: path.join(__dirname, "..", "public"),
        // },
      },
    });
    await this.addPlugins();
    this.server.route(Router);
  }
  public async start() {
    try {
      await this.initServer();
      await this.server.start();

      console.log(
        `Server running at  ${this.server.info.protocol}://${this.server.info.address}:${this.server.info.port} `
      );
      console.log(
        `Documentation can be accessed at  ${this.server.info.protocol}://${this.server.info.address}:${this.server.info.port}/documentation `
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default new App();

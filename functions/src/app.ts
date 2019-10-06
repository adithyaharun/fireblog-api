import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

class App {
  public app: express.Application;

  constructor(controllers: Array<any>) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);

    return this;
  }

  private initializeMiddlewares() {
    // Initialize body-parser.
    this.app.use(bodyParser.json());

    // Initialize CORS middleware.
    this.app.use(cors({ origin: true }));
  }

  private initializeControllers(controllers: Array<any>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    // "Route-not-found" handler.
    this.app.use(function (req, res) {
      res.status(404).json({ error: true, message: "Route not found." });
    });
  }
}

export default App;
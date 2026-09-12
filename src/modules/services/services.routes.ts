import { Router } from "express";
import * as controller from "./services.controller.js";

const serviceRouter = Router();

serviceRouter.get("/", controller.getServices);
serviceRouter.get("/:id", controller.getService);
serviceRouter.post("/", controller.createService);

export default serviceRouter;

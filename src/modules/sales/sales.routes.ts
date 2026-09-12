import { Router } from "express";
import * as controller from "./sales.controller.js";

const saleRouter = Router();

saleRouter.post("/", controller.createSale);

export default saleRouter;

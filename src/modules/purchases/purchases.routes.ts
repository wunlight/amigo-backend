import { Router } from "express";
import * as controller from "./purchases.controller.js";

const purchaseRouter = Router();

purchaseRouter.post("/", controller.createPurchase);

export default purchaseRouter;

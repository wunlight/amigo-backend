import { Router } from "express";
import * as controller from "./products.controller.js";

const productRouter = Router();

productRouter.get("/", controller.getProducts);
productRouter.get("/:id", controller.getProduct);
productRouter.post("/", controller.createProduct);
productRouter.put("/:id", controller.updateProduct);
productRouter.delete("/:id", controller.deleteProduct);

export default productRouter;

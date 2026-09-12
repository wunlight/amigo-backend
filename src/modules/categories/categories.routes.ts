import { Router } from "express";
import * as controller from "./categories.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", controller.getCategories);
categoryRouter.get("/:id", controller.getCategory);
categoryRouter.post("/", controller.createCategory);
categoryRouter.put("/:id", controller.updateCategory);
categoryRouter.delete("/:id", controller.deleteCategory);

export default categoryRouter;

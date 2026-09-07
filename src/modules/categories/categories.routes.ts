import { Router } from "express";
import * as controller from "./categories.controller.js";

const categoryRoutes = Router();

categoryRoutes.get("/", controller.getCategories);
categoryRoutes.get("/:id", controller.getCategory);
categoryRoutes.post("/", controller.createCategory);

export default categoryRoutes;

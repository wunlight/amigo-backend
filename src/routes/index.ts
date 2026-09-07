import { Router } from "express";
import categoryRoutes from "../modules/categories/categories.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/categories", categoryRoutes);

export default router;

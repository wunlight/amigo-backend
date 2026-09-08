import { Router } from "express";
import categoryRouter from "../modules/categories/categories.routes.js";
import productRouter from "../modules/products/products.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/categories", categoryRouter);
router.use("/products", productRouter);

export default router;

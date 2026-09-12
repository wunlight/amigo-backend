import { Router } from "express";
import categoryRouter from "../modules/categories/categories.routes.js";
import productRouter from "../modules/products/products.routes.js";
import purchaseRouter from "../modules/purchases/purchases.routes.js";
import saleRouter from "../modules/sales/sales.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/purchases", purchaseRouter);
router.use("/sales", saleRouter);

export default router;

import * as ProductsController from "./products.controllers";
import { Router } from "express";
const router = Router();
router.get("/get-slideproducts", ProductsController.getSlideProducts);
router.get("/get-allproducts/:id", ProductsController.getAllProducts);
export default router;

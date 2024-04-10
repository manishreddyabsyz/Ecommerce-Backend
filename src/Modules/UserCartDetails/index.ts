import { Router } from "express";
import * as UserCartDetails from "./userCartDetails.controller";
const router = Router();
router.post("/add-to-cart", UserCartDetails.postUserCartDetails);

export default router;

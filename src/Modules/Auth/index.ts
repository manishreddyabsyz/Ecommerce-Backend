import { Router } from "express";
import * as AuthController from "./auth.controller";
const router = Router();
router.post("/user-signup", AuthController.userSignup);
router.post("/get-token", AuthController.getToken);
router.post("/user-signin", AuthController.userSignin);
export default router;

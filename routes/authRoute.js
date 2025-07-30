import express from "express";
import {
  RegisterController,
  LoginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();
//Routing
//REGISTER ||METHOD POST
router.post("/register", RegisterController);
//LOGIN || POST
router.post("/Login", LoginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test router
router.get("/test", requireSignIn, isAdmin, testController);

//protect route auth for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route for Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;

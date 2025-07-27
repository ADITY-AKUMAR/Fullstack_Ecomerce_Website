import express from 'express';
import {RegisterController,LoginController,testController} from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
//router object
const router=express.Router();
//Routing
//REGISTER ||METHOD POST
router.post("/register",RegisterController);
//LOGIN || POST
router.post("/Login",LoginController);
//test router
router.get("/test",testController);

export default router;
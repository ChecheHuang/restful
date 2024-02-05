import express from "express";
import { login, register, getUserInfo } from "../controller/userController";
import tokenMiddleware from "../middleware/tokenMiddleware";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/userinfo", tokenMiddleware, getUserInfo);


export default router;

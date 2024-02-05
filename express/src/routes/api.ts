import express from "express";
const router = express.Router();
import userRouter from './user'
import cusRouter from './cus'
import labelRouter from "./label";
import tokenMiddleware from "../middleware/tokenMiddleware";
router.use("/user", userRouter);
router.use("/cus", tokenMiddleware, cusRouter);
router.use("/label", tokenMiddleware, labelRouter);



export default router
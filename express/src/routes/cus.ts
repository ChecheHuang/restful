import express from "express";
const router = express.Router();
import {
  index,
  index2,
  create,
  edit,
  destroy,
} from "../controller/cusController";


router.get("/", index);
router.get("/index", index2);
router.post("/", create);
router.patch("/:id", edit);
router.delete("/:id", destroy);

export default router;

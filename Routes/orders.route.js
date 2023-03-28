import express from "express";
import {
  createOrder,
  getOneOrder,
  getOrder,
} from "../Controller/Order.controller.js";

const router = express.Router();

router.route("/").post(createOrder);
router.route("/").get(getOrder);
router.route("/:id").get(getOneOrder);

export default router;


import express from "express"
import { createUser, loginUser } from "../Controller/User.controller.js"


const router = express.Router()


router.route("/register").post(createUser)
router.route("/login").post(loginUser)

export default router
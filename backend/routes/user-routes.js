import express from "express"
import {getAllUsers, getUserById, login, signup}  from "../controllers/user-controller.js"

const router = express.Router();

router.get("/", getAllUsers)
router.post("/signup",signup)
router.post("/login",login)
router.get("/:id", getUserById)

export default router;
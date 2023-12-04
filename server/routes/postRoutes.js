import express, { Router } from "express"
import userAuth from "../middleware/authMiddleware.js"
import { createPost, getPosts, getPost } from "../controllers/postController.js"

const router = express.Router()

//create post
router.post("/create-post", userAuth, createPost)

//get post
router.post("/", userAuth, getPosts)



export default router
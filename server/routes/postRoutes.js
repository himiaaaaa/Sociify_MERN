import express, { Router } from "express"
import userAuth from "../middleware/authMiddleware.js"
import { createPost, getPosts, getPost, getUserPost, getComments } from "../controllers/postController.js"

const router = express.Router()

//create post
router.post("/create-post", userAuth, createPost)

//get post
router.post("/", userAuth, getPosts)
router.post("/:id", userAuth, getPost)

router.post("/get-user-post/:id", userAuth, getUserPost)

//get comments
router.get("/comments/:postId", getComments)

export default router
import Posts from "../models/postModel.js";

export const createPost = async(req, res, next) => {
    try {
        const { userId } = req.body.userId
        const { description, image } = req.body

        if(!description) {
            next("Please provide a description")
            return;
        }

        const post = Posts.create({
            userId,
            description,
            image
        })

        res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error.message })
    }
}



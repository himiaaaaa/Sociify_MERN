import express from "express";
import path from "path";
import { 
    requestPasswordReset, 
    verifyEmail, 
    resetPassword, 
    changePassword,
    getUser,
    updateUser,
    friendRequest,
    getFriendRequest,
    acceptRequest,
    profileViews,
    suggestedFriends
 } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";


const router = express.Router();
const __dirname = path.resolve(path.dirname(""))

router.get("/verify/:userId/:token", verifyEmail)

//Password reset 
router.post("/request-passwordreset", requestPasswordReset) //User asks to reset password, gets a reset link.
router.get("/reset-password/:userId/:token", resetPassword) //User clicks link, sees form, sets new password.
router.post("/reset-password", changePassword) //User submits form, password is updated.

//user routes
router.post("/get-user/:id?", userAuth, getUser) //A request to "/get-user/:id" passes through the userAuth middleware before reaching the final handler (getUser).
router.put("/update-user", userAuth, updateUser)

//friend request
router.post('/friend-request', userAuth, friendRequest)
router.post('/get-friend-request', userAuth, getFriendRequest)

//accept/deny friend request
router.post("/accept-request", userAuth, acceptRequest)

//view profile
router.post("/profile-view", userAuth, profileViews)

//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends)

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})


export default router;
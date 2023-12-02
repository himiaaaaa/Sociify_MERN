import express from "express";
import path from "path";
import { 
    requestPasswordReset, 
    verifyEmail, 
    resetPassword, 
    changePassword,
    getUser,
    updateUser
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
router.post("/get-user/:id", userAuth, getUser) //A request to "/get-user/:id" passes through the userAuth middleware before reaching the final handler (getUser).
router.put("/update-user", userAuth, updateUser)

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})


export default router;
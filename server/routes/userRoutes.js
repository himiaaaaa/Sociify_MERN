import express from "express";
import path from "path";
import { requestPasswordReset, verifyEmail, resetPassword, changePassword } from "../controllers/userController.js";


const router = express.Router();
const __dirname = path.resolve(path.dirname(""))

router.get("/verify/:userId/:token", verifyEmail)

//Password reset 
router.post("/request-passwordreset", requestPasswordReset) //User asks to reset password, gets a reset link.
router.get("/reset-password/:userId/:token", resetPassword) //User clicks link, sees form, sets new password.
router.post("/reset-password", changePassword) //User submits form, password is updated.

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"))
})


export default router;
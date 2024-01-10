import JWT from "jsonwebtoken";

const userAuth = async(req, res, next) => {
    // Extract the Authorization header from the request
    const authHeader = req?.headers?.authorization

    // Check if Authorization header is missing or doesn't start with "Bearer"
    if(!authHeader || !authHeader?.startsWith("Bearer")){
        next("Authentication == failed")
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader?.split(" ")[1]

    try{
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY)

        req.body.user = {
            userId: userToken.userId
        }

        next()
    } catch (error) {
        console.log('error', error)
        next("Authentication failed")
    }
}

export default userAuth
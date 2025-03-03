
import jwt from 'jsonwebtoken';


// User authentication middleware

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized: No Token" });
        }

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // console.log("Decoded Token:", token_decode);

        req.body.userId = token_decode.id
        
        next();

    } catch (error) {
        console.log("JWT Verification Error:", error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authUser

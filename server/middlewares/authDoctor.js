
import jwt from 'jsonwebtoken';


// Doctor authentication middleware

const authDoctor = async (req, res, next) => {
    try {
        const dtoken = req.headers.authorization?.split(" ")[1];

        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Not Authorized: No Token" });
        }

        // Verify token
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        console.log("Decoded Token:", token_decode);

        req.body.docId = token_decode.id
        
        next();

    } catch (error) {
        console.log("JWT Verification Error:", error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authDoctor

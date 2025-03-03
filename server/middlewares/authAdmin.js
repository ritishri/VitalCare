// import jwt from 'jsonwebtoken'

// const authAdmin = async(req,res,next) =>{
//     try {

//         const {atoken} = req.headers

//         if(!atoken){
//             return res.json({success:false,message:"Not Authorized"})
//         }
//         const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)

//         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
//             return res.json({success:false,message:"Not Authorized"})
//         }

//          next()

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})

//     }
// }

// export default authAdmin

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized: No Token" });
    }

    // Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("Decoded Token:", token_decode);

    // Ensure token contains the correct admin email
    if (!token_decode.email || token_decode.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Invalid Admin" });
    }

    req.admin = token_decode;
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default authAdmin;

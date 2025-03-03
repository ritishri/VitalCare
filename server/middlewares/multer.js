import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})


const upload = multer({storage})

export default upload


// Multer is a middleware for Node.js that helps you handle file uploads. Think of it as a helper that allows your server to receive files (like images, PDFs, or videos) from a user and save them somewhere (e.g., on your computer or a cloud service).
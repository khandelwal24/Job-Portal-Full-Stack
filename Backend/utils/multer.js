import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    // destination:'./public/uploads',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

export const upload = multer({ storage: storage })




// import multer from "multer";
// import path from "path";

// const storage = multer.memoryStorage(); // Store file in memory instead of disk

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["application/pdf"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error("Only PDF files are allowed"), false);
//   }
//   cb(null, true);
// };

// export const upload = multer({ storage, fileFilter });

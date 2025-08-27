import express from "express";
const router = express.Router()
import { createUserQuery, registerUser, loginUser, logoutUser,navbardata, updateuser, testurl } from "../controllers/Usercontroller.js";
import {isLogin} from "../middlewares/checkcookies.js"
import multer from "multer";
const upload = multer({dest: "uploads/"})
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'vlog-images',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    },
  });
  
  const uploadCloud = multer({ storage });

router.post("/query", createUserQuery)
router.post("/register",uploadCloud.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/test",testurl)
router.get("/logout", logoutUser);
router.get("/navbardata", isLogin , navbardata);
router.put("/updateuser",isLogin,uploadCloud.single("image"), updateuser)

export default router
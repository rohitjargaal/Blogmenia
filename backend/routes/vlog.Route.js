import express from "express";
const router = express.Router()
import {isLogin} from "../middlewares/checkcookies.js"
import { getAllVlogs, getUserVlogs, addVlog, getVlogById, deleteVlog, updateVlog, getDashboard } from "../controllers/Vlogcontroller.js";
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

router.get("/all", isLogin, getAllVlogs)
router.get("/profile", isLogin, getDashboard);
router.get("/my", isLogin, getUserVlogs)
router.post("/", isLogin, uploadCloud.single("image"), addVlog);
router.get('/:id', isLogin, getVlogById);
router.delete('/:id', isLogin, deleteVlog);
router.put("/:id",isLogin, updateVlog)

export default router;
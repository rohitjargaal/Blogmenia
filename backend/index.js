import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.Route.js";
import vlogRoutes from "./routes/vlog.Route.js";
import cors from "cors"

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["https://blogmeniaa.onrender.com","http://localhost:5173"]
}));

app.use("/users", userRoutes)
app.use("/vlogs", vlogRoutes);

app.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("successfull connected db");
    }).catch((err) => {
        console.log(err)
    });
})
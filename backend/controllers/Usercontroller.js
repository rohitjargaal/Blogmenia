import UserModel from "../models/User.js";
import QueryModel from "../models/Query.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUserQuery = async (req, res) => {
    let { name, email, message } = req.body;
    console.log(req.body)

    const NewUser = new QueryModel({
        name: name,
        email: email,
        message: message,
    })
    await NewUser.save();
}

export const registerUser = async (req, res) => {
    let { username, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    const url = req.file.path;
    const filename = req.file.filename
    if (!existingUser) {
        const NewUser = new UserModel({
            username: username,
            email: email,
            password: password,
        });
        NewUser.userDP = { url, filename }
        await NewUser.save();
        res.status(200).json({ success: true, message: "User registered successfully" });
    } else {
        if (existingUser.email === email) {
            res.status(200).json({ success: false, message: "user already exists" });
        }
    }
}

export const loginUser = async (req, res) => {
    console.log(req)
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials: User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials: Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        return res.status(200).json({
            success: true,
            message: "User login successful",
            userId: user._id,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error during login" });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful", success: true }); // Respond with success
}

export const navbardata = async (req, res) => {
    const userId = req.user;
    const token = req.token
    const userdetail = await UserModel.findById(userId)
    res.json({ userdetail: userdetail, token: token })
}

export const updateuser = async (req, res) => {
    const userId = req.user;
    const { username, email } = req.body;
    const updateData = { username, email };

    if (req.file) {
        updateData.userDP = { url: req.file.path };
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updateData,

        );

        if (updatedUser) {
            res.json({ success: true, message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }

}

export const testurl = async (req, res) => {
    res.json({ messsage: "test subject api url" })
}
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    userDP:{
        url:String,
        filename: String,
    }
})

UserSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12) 
    }
    next()
})

const UserModel = mongoose.model("UserModel", UserSchema)
export default UserModel


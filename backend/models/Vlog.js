import mongoose from "mongoose";

const vlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    image:{
        url:String,
        filename: String,
    }
})

const Vlog = mongoose.model("Vlog", vlogSchema)
export default Vlog
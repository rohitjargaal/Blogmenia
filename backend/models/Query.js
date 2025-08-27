import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
})

const QueryModel = mongoose.model("QueryModel", QuerySchema)
export default QueryModel
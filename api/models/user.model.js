import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"username is required"],
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}//time for creation and update
)

const User = mongoose.model("User",userSchema)
export default User
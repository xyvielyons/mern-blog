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
        required:true,
        select:false
    },
    profilePicture:{
      type:String,
      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk2mpwyMPUXsU5jXlBBN-WJVhkjS5c8KJuX4ltBhaUZM_hjLL0GYtywvbeHVAI6hFn5aw&usqp=CAU"
    },
    refreshToken:{type:[String]},
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}//time for creation and update
)

const User = mongoose.model("User",userSchema)
export default User
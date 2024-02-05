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
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0NFvRsQ52_g8DZ1oCNnIcC&ust=1707176217719000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNjcu5ntkoQDFQAAAAAdAAAAABAE"
    }
},
{timestamps:true}//time for creation and update
)

const User = mongoose.model("User",userSchema)
export default User
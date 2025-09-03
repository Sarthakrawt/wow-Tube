import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const UserSchema =  new mongoose.Schema({
    username:{
        type : String,
        require: true,
        unique: true,
        lowercase: true,
        trim : true,
        index: true
    },
    email: {
        type: String,
        require : true,
        unique: true,
        trim: true,
        index: true
    },
    avatar : {
        type: String,
        require: true,
    },
    coverImage: {
        type: String,

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type: String,
        require: [true, "password is required"]
    },
    refreshToken: {
        type: String
    }
},{
    timestamps: true
});


UserSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    try{
         console.log("password after hashing"
        , this.password)
this.password = await bcrypt.hash(this.password, 10)
console.log("password after hashing"
    , this.password)
next()
    } catch(err){
        console.error("Error hashing password" , err)
    }
   
});



UserSchema.methods.isPasswordCorrect = async function (password){
    console.log("password",password);
    console.log("Hashed Password", this.password);
   return  await bcrypt.compare(password, this.password);
}


UserSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
       
    )
}

UserSchema.methods.generateRefreshToken = function(){
 return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User', UserSchema);
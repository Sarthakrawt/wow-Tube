import { app } from "./app.js";

import connectDB from "./db/index.js";
import { configDotenv } from "dotenv";

configDotenv();
connectDB()
.then(()=>{
 
     app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port : ${process.env.PORT}`)
  })
})
.catch((err)=>{
  
  console.log("sever connection failed", err);
} 
)


// import express from "express"
// const app = express()
// ;(async ()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}`)
// app.on listener is just used when your server have some issue 
//       app.on('error', (error)=>{
//         console.log("Error", error);
//         throw error
//       })
//       app.listen(process.env.PORT , ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)
//       })
//     }catch(error){
//         console.error("Error", error)
//     }
// })()

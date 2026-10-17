import mongoose from "mongoose";
export default async function connectDB(){
    try{
          if(mongoose.connections[0].readyState)
                return
            await mongoose
          .connect("mongodb://localhost:27017/next-phone")
            console.log("connect to db successfully")
    }catch(err){
        console.log(err)
    }
   
}
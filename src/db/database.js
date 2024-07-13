import mongoose from "mongoose";


import { DB_NAME } from "../constants.js";


export const connectDB = async ()=>{
    try{
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }  );
      console.log(`db connected :${connectionInstance.connection.host}`)
    }
    catch(e){
        console.error(" mongodb connection failed",e);
        process.exit(1);
    }
    
}
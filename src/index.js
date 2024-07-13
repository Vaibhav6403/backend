import dotenv from "dotenv"
import  {connectDB}  from "./db/database.js";
import app from "./app.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.on("error",()=>{
        console.log("erro before listening") 
    })

    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app listening at port ${process.env.PORT}`)
    })
})
.catch((e)=>{
    console.error("mongo db connection failed",e)
})



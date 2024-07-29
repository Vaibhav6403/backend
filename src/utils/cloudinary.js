import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
});

export const uploadOnCloudinary = async (localfilepath)=>{
    try{
        if(!localfilepath) return null
       const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localfilepath);
        return response;
    }
    catch(error){
        fs.unlinkSync(localfilepath) //remove the locally saved temporary file as the upload operation got failed.
    }
}


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser  = asyncHandler(
 async (req,res)=>{
   // get user details from frontend
   // validation perform
   // check if user already exists by username or email
   // check for the images,check for avatar
   // upload them to cloudinary
   // create user object -- in db
   // remove password and refresh token from response
   // check for user creation
   // return res


   const {fullname, email,username,password} = req.body;
  
   if([fullname,email,username,password].some((field)=>field?.trim()=="")){
    throw new ApiError(400,"all fields is required")
   }

   const existedUser = await User.findOne({
      $or:[{ username },{ email }]
   })
   console.log(existedUser,"the existed user")

   if(existedUser){
    throw new ApiError(409,"username or email already exists")
   }

   const avatarLocalPath = req?.files?.avatar[0]?.path;
  //  const coverImageLocalPath = req?.files?.coverImage[0].path;

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

   if(!avatarLocalPath){
    throw new ApiError(400,"avatar is compulsory")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if(!avatar){
    throw new ApiError(400,"avatar is compulsory")
   }

   const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   console.log("before the created user",user)
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   console.log("the user is creatd",createdUser)

   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User created Successfully")
   )




 })

 export {registerUser};
import dotenv from "dotenv"

dotenv.config()

export const MONGOOSE_URI = process.env.MONGOOSE_URI;
export const PORT = process.env.PORT || 4000;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

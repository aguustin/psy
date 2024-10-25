import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    imgProfile: {type: String},
    username: {type: String},
    description: {type: String},
    date: {type: Date},
    authorized: {type: Number}
})

export default mongoose.model("experience", experienceSchema)
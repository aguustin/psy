import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    imgProfile: {type: String},
    category: {type: String},
    title: {type: String},
    subtitle: {type: String},
    titleImg: {type: String},
    description: {type: String},
    date: {type: Date}
})

export default mongoose.model("blogs", blogSchema)
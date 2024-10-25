import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String},
    lastname: {type: String},
    mail: {type: String},
    password: {type: String},
    rol: {type: Number},
    imgProfile: {type: String}
})

export default mongoose.model("users", userSchema)
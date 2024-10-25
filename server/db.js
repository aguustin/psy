import mongoose from "mongoose"
import { MONGOOSE_URI } from "./config.js"


export const DBConnection = async () => {
    try {
        await mongoose.connect(MONGOOSE_URI)
        console.log('se conecto bien')
    } catch (error) {
        console.log(error)
    }
}
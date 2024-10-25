import express from "express";
import { DBConnection } from "./db.js";
import morgan from "morgan";
import passport from "passport";
import { PORT } from "./config.js";
import blogsRoutes from './routes/blogsRoutes.js'
import experiencesRoutes from './routes/experiencesRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
import bodyParser from "body-parser";

const app = express()
DBConnection()
//settings

//middlewares

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.use(passport.initialize())
app.use(bodyParser.json());
app.use(cors());
//routes

app.use(blogsRoutes)
app.use(experiencesRoutes)
app.use(userRoutes)

//listening

app.listen(PORT, console.log(`The server is listening in port: ${PORT}`))
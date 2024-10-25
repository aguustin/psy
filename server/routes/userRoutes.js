import { Router } from "express";
import { getAllUsersController, loginController, signInController, uploadImgProfileController } from "../controllers/userController.js";
import upload from '../middleware/multer.js'

const router = Router()

router.post('/signin', signInController)

router.post('/login', loginController)

router.post('/uploadImgProfile', upload.single('imgProfile'), uploadImgProfileController)

router.get('/getAllUsers', getAllUsersController)

export default router
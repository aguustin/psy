import { Router } from "express";
import { createBlogController, editBlogsController, getBlogsController, deleteAllBlogsController } from "../controllers/blogsController.js";
import upload from "../middleware/multer.js";

const router = Router()

router.post('/create_blog', upload.fields([
    { name: 'imgProfile', maxCount: 1 },
    { name: 'titleImg', maxCount: 1 }
]), createBlogController);

router.post('/update_blog', upload.fields([
    {name: 'imgProfile', maxCount: 1},
    {name: 'titleImg', maxCount: 1}
]), editBlogsController);

router.get('/get_blogs', getBlogsController);

router.delete('/deleteAllBlogs', deleteAllBlogsController);

export default router
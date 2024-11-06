import { Router } from "express";
import { createBlogController, editBlogsController, getBlogsController, deleteAllBlogsController, deleteOneBlogController, readBlogController } from "../controllers/blogsController.js";
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

router.get('/readBlog/:blogId', readBlogController);

router.post('/editBlog', upload.single('titleImg'), editBlogsController);

router.delete('/deleteAllBlogs', deleteAllBlogsController);

router.delete('/deleteOneBlog/:blogId', deleteOneBlogController);

export default router
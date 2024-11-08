import cloudinary from "../libs/cloudinary.js";
import blogs from "../models/blogsModel.js"
import fs from 'fs'

export const createBlogController = async (req, res) => {
    const { title, category, subtitle, description } = req.body;
    const date = Date.now();

    try {
        // Check that files are being received
        if (!req.files) {
            return res.status(400).json({ error: "Both imgProfile and titleImg are required." });
        }

        //const imgProfileFile = req.files.imgProfile; // This will have the buffer
        const titleImgFile = req.files.titleImg[0];     // This will have the buffer
        console.log(titleImgFile.buffer)
        // Create a promise to handle imgProfile upload
       /* const imgProfileUploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'psycho' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(imgProfileFile[0].buffer);
        });*/

        // Create a promise to handle titleImg upload
        const titleImgUploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'psycho' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(titleImgFile.buffer);
        });

        // Wait for both uploads to complete
        const [/*imgProfileUrl,*/ titleImgUrl] = await Promise.all([
            //imgProfileUploadPromise,
            titleImgUploadPromise
        ]);

        // Create blog entry
        const createBlog = await blogs.create({
            imgProfile: '',
            titleImg: titleImgUrl,
            category: category,
            title: title,
            subtitle: subtitle,
            description: description,
            date
        });

        // Send response
        res.status(201).json(createBlog); // Ensure only one response is sent here
    } catch (error) {
        console.error('Error uploading files:', error);
        if (!res.headersSent) { // Check if headers are already sent
            res.status(500).send(error);
        }
    }
};
export const editBlogsController = async (req, res) => {

    const {blogId, title, category, subtitle, description} = req.body;
    const date = Date.now()
    console.log("blogid", blogId, " title", title, " category", category, " ", req.file)
    if(!req.file){
        await blogs.updateOne(
            {_id: blogId},
            {
                $set:{
                    title: title,
                    category: category,
                    subtitle: subtitle,
                    description: description,
                    date: date
                }
            }
        )
        res.sendStatus(200)
    }

   /* let imgProfileUploadPromise

    if(req.files.imgProfile){
        imgProfileUploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'psycho' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(req.files.imgProfile[0].buffer);
        });
    }*/

    let titleImgUploadPromise

    if(req.file){
        titleImgUploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'psycho' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(req.file.buffer);
        });

    }

    const [/*imgProfileUrl,*/ titleImgUrl] = await Promise.all([
       // imgProfileUploadPromise,
        titleImgUploadPromise
    ]);

    if(titleImgUrl){
        await blogs.updateOne(
            {_id: blogId},
            {
                $set:{
                    title: title,
                    category: category,
                    subtitle: subtitle,
                    titleImg: titleImgUrl,
                    description: description,
                    date: date
                }
            }
        )
        res.sendStatus(200)
    }
}

export const getBlogsController = async (req, res) => {
    const getBlogs = await blogs.find({}).sort({_id: -1})
    res.send(getBlogs)
}

export const readBlogController = async (req, res) => {
    const blogId = req.params.blogId
    const getBlog = await blogs.find({_id: blogId})

    res.send(getBlog)
}

export const deleteAllBlogsController = async () => {
    await blogs.deleteMany();
    res.sendStatus(200)
}

export const deleteOneBlogController = async (req, res) => {
    const blogId = req.params.blogId

    const itsOk = await blogs.deleteOne(
        {_id: blogId}
    )
    
    if(itsOk.length > 0){
        res.status(200).send("El blog fue borrado correctamente")
    }else{
        res.status(200).send("Hubo un error al borrar el blog")
    }
}
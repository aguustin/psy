import Cryptr from "cryptr";
import users from "../models/usersModel.js"
import cloudinary from "../libs/cloudinary.js";

export const signInController = async (req, res) => {
    const {name, lastname, mail, password, confirmPass} = req.body

    const checkUsers = await users.find({mail: mail});

    if(checkUsers.length > 0){
        console.log('usuario encontrado')
        res.sendStatus(200)
    }else{
        if(password !== confirmPass){
            console.log('las contraseñas son diferentes')
            res.sendStatus(200)
        }else{
            const cryptr = new Cryptr('myTotallySecretKey');
            const passwordEnc = await cryptr.encrypt(password);
    
            const createUser = await users.create({
                name: name,
                lastname: lastname,
                mail: mail,
                password: passwordEnc,
            })
    
           res.send(createUser)
        }
    }
}

export const loginController = async (req, res) => {
    const {mail, password} = req.body

    const checkUser = await users.find({mail: mail});

    if(checkUser.length > 0){
        const cryptr = new Cryptr('myTotallySecretKey');
        const desencryptPass = cryptr.decrypt(checkUser[0].password)

        if(desencryptPass === password){ 
            console.log(desencryptPass)
            res.send(checkUser)
        }else{
            console.log('La contraseña es incorrecta')
            res.sendStatus(200)
        }
    }else{
        console.log('no se encuentra el usuario')
        res.sendStatus(200)
    }
}

export const uploadImgProfileController = async (req, res) => {
    const {mail} = req.body
    let stream
    
    const uploadProfileImgUrl = new Promise( async (resolve, reject) => {
        stream = await cloudinary.uploader.upload_stream(
            {folder: ''},
            (error, result) => {
                if(error) return reject(error)
                 resolve(result.secure_url)
            }
        )
        stream.end(req.file.buffer)
    })

    console.log(req.file.buffer)


    const processUpload = await uploadProfileImgUrl

    console.log(processUpload);

    await users.updateOne(
        {mail: mail},
        {
            $set:{
                imgProfile: processUpload
            }
        }
    )

    res.sendStatus(200)
    
}

export const getAllUsersController = async (req, res) => {
    const getUsers = await users.find({}).sort({_id: -1})

    res.send(getUsers)
}
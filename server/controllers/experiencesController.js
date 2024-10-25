import experience from "../models/experiencesModel.js"

export const createExperienceController = async (req, res) => {
    const { userImgProfile, username, experienceDesc} = req.body;
    const date = Date.now()
    console.log(username)
    const createExp = await experience.create({
        imgProfile: userImgProfile,
        username: username,
        description: experienceDesc,
        date: date,
        authorized: 0
    })

    res.sendStatus(200)
}

export const autorizeExperienceController = async (req, res) => {
    const userId = req.params.userId
    
    await experience.updateOne({_id: userId},
        {
            $set:{
                authorized: 1
            }
        }
    )

    res.sendStatus(200)
}

export const getExperiencesController = async (req, res) => {
    const getExps = await experience.find({}).sort({_id: -1})

    res.send(getExps);
}

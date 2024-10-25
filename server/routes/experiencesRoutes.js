import { Router } from "express";
import { autorizeExperienceController, createExperienceController, getExperiencesController } from "../controllers/experiencesController.js";

const router = Router()

router.post('/createExp', createExperienceController)

router.put('/autorizeExp/:userId', autorizeExperienceController)

router.get('/getAllExp', getExperiencesController)

export default router
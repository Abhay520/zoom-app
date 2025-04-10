import express from 'express'
import { ParticipantController } from '../controllers/participant.controller.js';

const router = express.Router()

router.get('/:userName', ParticipantController)

export default router
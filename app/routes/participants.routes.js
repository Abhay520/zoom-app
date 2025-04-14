import express from 'express'
import ParticipantController from '../controllers/participant.controller.js';

const router = express.Router()

router.get('/:userName', ParticipantController.getParticipantByUserName)

router.get('/', (req, res, next) => {
    if(req.query.participant){
        res.redirect(`participants/${req.query.participant}`)
    }
    else next()
}, ParticipantController.getAllParticipants)

export default router
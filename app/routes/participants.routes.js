import express from 'express'
import { ParticipantController } from '../controllers/participant.controller.js';

const router = express.Router()

router.get('/:userName', ParticipantController)

router.get('/', (req, res) => {
    if(req.query.participant){
        res.redirect(`participant/${req.query.participant}`)
    }
    else res.redirect('../zoom-app')
})

export default router
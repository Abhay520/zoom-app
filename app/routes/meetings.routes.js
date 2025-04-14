import express from 'express'
import MeetingController from '../controllers/meeting.controller.js'

const router = express.Router()

router.get('/', MeetingController.getAllMeetings)
router.get('/:meetingId', MeetingController.getMeetingById)

export default router
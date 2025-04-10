import express from 'express'
import { MeetingController } from '../controllers/meeting.controller.js';
import { ListMeetingController } from '../controllers/listMeeting.controller.js';

const router = express.Router()

router.get('/', ListMeetingController)
router.get('/:meetingId', MeetingController)

export default router
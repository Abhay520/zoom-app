import express from 'express'
import MeetingController from '../controllers/meeting.controller.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Meeting:
 *       type: object
 *       required:
 *         - meetingId
 *         - meetingStartTime
 *         - meetingEndTime
 *         - numberOfParticipants
 *       properties:
 *         meetingId:
 *           type: string
 *           description: The auto-generated id of the meeting
 *         meetingStartTime:
 *           type: object
 *           description: The starting time of the meeting, in mauritius as well as canada time
 *         meetingEndTime:
 *           type: object
 *           description: The ending time of the meeting, in mauritius as well as canada time
 *         numberOfParticipants:
 *           type: integer
 *           description: The number of participants who attended the meeting
 *       example:
 *         meetingId: 67fa55b18dc354a628266009
 *         meetingStartTime: {mauritiusTime: "4/12/2025, 3:59:44 PM",canadaTime: "4/12/2025, 7:59:44 AM"}
 *         meetingEndTime: {mauritiusTime: "4/12/2025, 8:29:25 PM",canadaTime: "4/12/2025, 12:29:25 PM"}
 *         numberOfParticipants: 19
 */

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: The meetings information API
 * /meetings:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get the list of meetings created by this zoom account
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: The list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Some server error
 *
* /meetings/{id}:
 *   get:
 *     summary: Get the meeting by id
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         schema:
 *           type: string
 *         required: true
 *         description: The meeting id
 *     responses:
 *       200:
 *         description: The meeting logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Meeting'
 *       500:
 *         description: Some server error
 *
 */

const router = express.Router()

router.get('/', MeetingController.getAllMeetings)
router.get('/:meetingId', MeetingController.getMeetingById)

export default router
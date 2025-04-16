import express from 'express'
import ParticipantController from '../controllers/participant.controller.js';

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Participant:
 *       type: object
 *       required:
 *         - userName
 *         - meetingLogs
 *       properties:
 *         userName:
 *           type: string
 *           description: The name of the user
 *         meetingLogs:
 *           type: object
 *           description: The logs of the user
 *       example:
 *         userName: Aanya
 *         meetingLogs: [
 *                          {
 *                              meetingInformation: {
 *                                  meetingStartTime: {mauritiusTime: "4/13/2025, 3:57:30 PM",canadaTime: "4/13/2025, 7:57:30 AM"},
 *                                  meetingEndTime: {mauritiusTime: "4/13/2025, 8:28:39 PM",canadaTime: "4/13/2025, 12:28:39 PM"},
 *                                  duration: "04:31:09"
 *                              }, 
 *                              meetingLog: {
 *                                  userName: "Aanya",
 *                                  timeSpent: "01:59:14",
 *                                  logs: [
 *                                      {
 *                                          event: "meeting.participant_joined",
 *                                          time: {mauritiusTime: "4/13/2025, 4:02:36 PM",canadaTime: "4/13/2025, 8:02:36 AM"}
*                                       },
 *                                      {
 *                                          event: "meeting.participant_left",
 *                                          time: {mauritiusTime: "4/13/2025, 5:01:03 PM",canadaTime: "4/13/2025, 9:01:03 AM"},
 *                                          reason: "left the meeting. Reason : left the meeting"
 *                                      },
 *                                  ]
 *                              }
 *                          }
 *                     ]
 */

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: The participants information API
 * /participants:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get the list of participants that ever joined the zoom meetings
 *     tags: [Participants]
 *     responses:
 *       200:
 *         description: The list of participants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       500:
 *         description: Some server error
 *
* /participants/{participantName}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get the meeting by id
 *     tags: [Participants]
 *     parameters:
 *       - in: path
 *         name: participantName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the participant
 *     responses:
 *       200:
 *         description: The participant logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Participant'
 *       500:
 *         description: Some server error
 *
 */

router.get('/:userName', ParticipantController.getParticipantByUserName)

router.get('/', (req, res, next) => {
    if(req.query.participant){
        res.redirect(`participants/${req.query.participant}`)
    }
    else next()
}, ParticipantController.getAllParticipants)

export default router
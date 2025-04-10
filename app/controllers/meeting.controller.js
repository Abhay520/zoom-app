import { Meeting } from "../models/meeting.model.js"
import { getMeetingInformation } from "../util/meeting.util.js"
import { getParticipantInformation } from "../util/participant.util.js"

export const MeetingController = async(req, res) => {
    const meetingId = req.params.meetingId
    await Meeting.findById(meetingId).populate({
        path : 'participants',
        populate : {path : 'logs'}
    }).then((meeting) => {
        //get meeting duration etc
        let meetingInformation = getMeetingInformation(meeting)
        let participantInformation = []
        meeting.participants.forEach(participant => {
            //get participant attendance and logs
            participantInformation.push(getParticipantInformation(participant, meeting._id))
        })
        res.json({"meetingInformation" : meetingInformation, "participants" : participantInformation})
    }).catch(err => res.send(err))
}

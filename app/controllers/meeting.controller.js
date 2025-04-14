import { Meeting } from "../models/meeting.model.js"
import { getListMeetingsInformation, getMeetingInformation } from "../util/meeting.util.js"
import { getParticipantInformation } from "../util/participant.util.js"

const MeetingController = {};

MeetingController.getMeetingById = async(req, res) => {
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
    res.json({"data" : {"meetingInformation" : meetingInformation, "participants" : participantInformation}})
    }).catch(err => res.send(err))
}

MeetingController.getAllMeetings = async(req, res) => {
    const meetings = await Meeting.find({}).exec()
    res.json({"data" : getListMeetingsInformation(meetings)})
}

export default MeetingController

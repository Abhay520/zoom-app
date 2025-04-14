import { Meeting } from "../models/meeting.model.js"
import { Participant } from "../models/participant.model.js"
import { getMeetingInformation } from "../util/meeting.util.js"
import { getParticipantInformation } from "../util/participant.util.js"

export const ParticipantController = async(req, res) => {
    const userName = req.params.userName
    const participant = await Participant.exists({userName : userName}).exec();
    if(!participant){
        return res.status(401).send('Participant does not exist!');
    }
    await Participant.findOne({userName : userName}).populate({
            path : 'logs'
    }).then(async participant =>{
        let meetingIds = new Set;
        let meetingLogs = []
        participant.logs.forEach(log => {meetingIds.add(log.meetingId.toString())})
        for(const meetingId of meetingIds){
            await Meeting.findById(meetingId).then((meeting) => {
                //get meeting duration etc
                let meetingInformation = getMeetingInformation(meeting)
                let particpantInformation = getParticipantInformation(participant, meetingId)
                meetingLogs.push({"data" :{"meetingInformation" : meetingInformation, "meetingLog" : particpantInformation}})
            })
        }
        return res.status(200).json({"userName" : userName, "meetingLogs" : meetingLogs})
    }).catch(err => res.send(err))
}
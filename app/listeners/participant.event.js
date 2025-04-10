import { createNewLog } from "../models/log.model.js"
import { addParticipantToMeeting, createNewMeetingIfNotExist } from "../models/meeting.model.js"
import { addLogToParticipant, createNewParticipantIfNotExist } from "../models/participant.model.js"
import { participantJoinedEvent } from "./socketManager.js"

export const participantEvent = async(object, event) => {
    const participant = object.participant
    const eventTime = (event == participantJoinedEvent) ? participant.join_time : participant.leave_time

    await createNewMeetingIfNotExist(object.start_time, null).then(async meetingObjectId => {
        await createNewParticipantIfNotExist(participant.user_name).then(async participantObjectId => {
            await addParticipantToMeeting(participantObjectId, meetingObjectId).catch(err => console.log(err))
            await createNewLog(eventTime, event, participant.leave_reason, meetingObjectId).then(async logObjectId => {
                await addLogToParticipant(participantObjectId, logObjectId).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}
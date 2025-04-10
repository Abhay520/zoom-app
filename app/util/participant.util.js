import { participantJoinedEvent, participantLeftEvent } from "../listeners/socketManager.js";
import { getLogInformation } from "./log.util.js";
import { displayTimeSpent } from "./time.util.js";

export const getParticipantInformation = (participant, meetingId) => {
    const userName = participant.userName
    let timeSpent
    let logs = []
    let durationInMeeting = 0;
    for(const log of participant.logs){
        if(log.meetingId.equals(meetingId)){
            logs.push(log)
        }
    }
    //if first meeting log is not join or last meeting log is not left
    if(logs[0].event != participantJoinedEvent || logs[logs.length-1].event != participantLeftEvent){
        timeSpent = null
    }
    else{
        for(let i = 0; i < logs.length; i++){
            if(i % 2 == 1){
                durationInMeeting += logs[i].time.getTime() - logs[i - 1].time.getTime()
            }
        }
        timeSpent = displayTimeSpent(durationInMeeting)
    }

    let meetingLogs = []
    for(const log of logs){
        meetingLogs.push(getLogInformation(log))
    }

    return {"userName" : userName, "timeSpent" : timeSpent, "logs" : meetingLogs}
}
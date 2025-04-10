import { displayTimeSpent, timeMessage } from "./time.util.js"

export const getMeetingInformation = (meeting) => {
    let duration = null;
    if(meeting.meetingEndTime){
        duration = displayTimeSpent(meeting.meetingEndTime.getTime() - meeting.meetingStartTime.getTime())
    }
    return {
        "meetingStartTime" : timeMessage(meeting.meetingStartTime), 
        "meetingEndTime" : timeMessage(meeting.meetingEndTime), 
        "duration" : duration
    }
}

export const getListMeetingsInformation = (meetings) => {
    let result = []
    for(const meeting of meetings){
        result.push(
            {
                "meetingId" : meeting._id,
                "meetingStartTime" : timeMessage(meeting.meetingStartTime),
                "meetingEndTime" : timeMessage(meeting.meetingEndTime),
                "numberOfParticipants" : meeting.participants.length
            })
    }
    return result
}
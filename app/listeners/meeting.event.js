import { createNewMeetingIfNotExist, Meeting } from "../models/meeting.model.js"
import { meetingEndedEvent } from "./socketManager.js"

export const meetingEvent = async(obj, event) => {
    await createNewMeetingIfNotExist(obj.start_time, obj.end_time).then(async meetingObjectId => {
        if(event == meetingEndedEvent){
            const doc = await Meeting.findById(meetingObjectId).exec()
            doc.meetingEndTime = obj.end_time
            await doc.save().then(() => console.log("Meeting ended, Meeting updated in db")).catch(err => console.log(err))
        }
    })
}
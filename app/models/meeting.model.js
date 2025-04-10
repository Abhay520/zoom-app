import mongoose, { Schema } from "mongoose";

const meetingSchema = new mongoose.Schema({
    meetingStartTime : Date,
    meetingEndTime : {type: Date, required : false},
    participants : [{type: Schema.Types.ObjectId, ref : "Participant"}]
})

export const Meeting = mongoose.model('Meeting', meetingSchema)

//this creates meeting if it does not exist and  returns meeting object id
export const createNewMeetingIfNotExist = async(startTime, endTime) => {
    const meeting = await Meeting.exists({meetingStartTime : startTime}).exec();
    if(!meeting){
        const meeting = new Meeting({meetingStartTime : startTime, meetingEndTime : endTime, participants : []})
        return await meeting.save().then((res) => {
            console.log("Meeting did not exist, New meeting created in db")
            return res._id
        }).catch((err) =>console.log(err))
    }
    else return meeting._id
}

export const addParticipantToMeeting = async(participantObjectId, meetingObjectId) => {
    var found = false;
    const doc = await Meeting.findById(meetingObjectId).exec();
    //check to see if participant is already in meeting
    for(const participant of doc.participants){
        if(participant.equals(participantObjectId)) found = true;
    }
    if(!found){
        doc.participants.push(participantObjectId)
        await doc.save().then(() => console.log(`Participant joining this meeting for the first time`)).catch((err) =>console.log(err))
    }
}
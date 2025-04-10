import mongoose, { Schema } from "mongoose";

const logSchema = new mongoose.Schema({
    time : Date, 
    event : String, 
    reason : String,
    meetingId : {type: Schema.Types.ObjectId, ref : "Meeting"}
})

export const Log = mongoose.model('Log', logSchema)

export const createNewLog = async(time, event, reason, meetingObjectId) => {
    const log = new Log({time : time, event : event, reason : reason, meetingId : meetingObjectId})
    return await log.save().then((res) => 
    {
        console.log("Creating new log for meeting " + meetingObjectId)
        return res._id;
    })
    .catch((err) =>console.log(err))
}
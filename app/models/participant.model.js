import mongoose, { Schema } from "mongoose";

const participantSchema = new mongoose.Schema({
    userName : String,
    logs : [{type: Schema.Types.ObjectId, ref : "Log"}]
})

export const Participant = mongoose.model('Participant', participantSchema)

export const createNewParticipantIfNotExist = async(userName) => {
    const participant = await Participant.exists({userName : userName}).exec();
    if(!participant){
        const doc = new Participant({userName : userName, logs : []})
        return await doc.save().then((res) => {
            console.log("Participant did not exist, New Participant created in db")
            return res._id
        }).catch((err) =>console.log(err))
    }
    return participant._id
}

export const addLogToParticipant = async(participantObjectId, logObjectId) => {
    const doc = await Participant.findById(participantObjectId).exec();
    doc.logs.push(logObjectId)
    await doc.save().then(() => console.log(`Adding log to participant`)).catch((err) =>console.log(err))
}
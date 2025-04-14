import { Meeting } from "../models/meeting.model.js"
import { getListMeetingsInformation } from "../util/meeting.util.js"

export const ListMeetingController = async(req, res) => {
    const meetings = await Meeting.find({}).exec()
    res.json({"data" : getListMeetingsInformation(meetings)})
}
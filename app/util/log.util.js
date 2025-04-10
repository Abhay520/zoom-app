import { timeMessage } from "./time.util.js"


export const getLogInformation = (log) => {
    return {
        "event" : log.event,
        "time" : timeMessage(log.time),
        "reason" : log.reason 
    }
}
import WebSocket from 'ws'
import { accessToken } from '../util/token.js';
import { participantEvent } from './participant.event.js';
import { meetingEvent } from './meeting.event.js';

const heartbeat = {"module": "heartbeat"}

export const participantJoinedEvent = "meeting.participant_joined"
export const participantLeftEvent = "meeting.participant_left"
export const meetingStartedEvent = "meeting.started"
export const meetingEndedEvent = "meeting.ended"

const getWebSocketUrl = async() => {
    var webSocketEndpointUrl = `wss://ws.zoom.us/ws?subscriptionId=uFW_y8bCS8ahbilhNZNRsQ&access_token=`
    webSocketEndpointUrl  += await accessToken().catch((err) => {console.log(err)});
    return new WebSocket(webSocketEndpointUrl)
}

export const socketManager = async() => {
    
    var ws = await getWebSocketUrl()

    ws.on('error', (error) => {
        console.log(`Socket error encountered :\n${error}`)
        ws.close();
    });

    ws.on('open', function open() {
        console.log(`Connection open at ${new Date()}`)
        //send heartbeat to keep connection alive
        setInterval(function(){ws.send(JSON.stringify(heartbeat));}, 25000);
    }); 

    ws.on('message', async (data) => {
        data = JSON.parse(data);
        if(data.module != "message")return;
        const event = JSON.parse(data.content).event
        const object = JSON.parse(data.content).payload.object

        if(event == meetingStartedEvent || event == meetingEndedEvent) 
            await meetingEvent(object, event).then(res => console.log("Meeting event dealt with"))
        else if(event == participantJoinedEvent || event == participantLeftEvent) 
            await participantEvent(object, event).then(res => console.log("Participant event dealt with"))
    });

    ws.on('close', function message() {
        console.log(`Connection closed at ${new Date()}`)
        setTimeout(socketManager(), 100)
    });
}



export const timeMessage = (date) => {
    if(!date) return null
    const canadaTime = date.toLocaleString('en-US', { timeZone: 'America/Montreal' }).toString();
    const mauritianTime = date.toLocaleString('en-US', { timeZone: 'Indian/Mauritius' }).toString();
    return {"mauritiusTime" : mauritianTime, "canadaTime" : canadaTime};
}

export const displayTimeSpent = (duration)  =>{

    var seconds = Math.floor((duration / 1000) % 60)
    var minutes = Math.floor((duration / (1000 * 60)) % 60)
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds
}
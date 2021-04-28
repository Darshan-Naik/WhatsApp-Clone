import React from 'react'
import { useSelector } from 'react-redux'

function Message({data={}}) {
    const {author,message,isRead,time,authorPhoto} = data //message data
    const {displayName}= useSelector(store=>store.auth.user) // current user name 

     //converting universal message time to local time
    const localTime =  new Date(time?.seconds).toLocaleTimeString()

    // rendering message
    return (
            // changing message style based on received / sent
        <div className={`message flexBox ${author !== displayName? "received" : "sent"}`}>
            <p>{message || "Dummy text"}</p>
            <div>
            <small>{localTime || "Time stamp"}</small>
            </div>
            
        </div>
    )
}

export default Message

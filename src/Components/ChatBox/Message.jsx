import React from 'react'
import { useSelector } from 'react-redux'

function Message({data={}}) {
    const {author,message,isRead,time,authorPhoto} = data
    const {displayName}= useSelector(store=>store.auth.user)
    const localTime =  new Date(time?.seconds).toLocaleTimeString()
    return (
        <div className={`message flexBox ${author !== displayName? "received" : "sent"}`}>
            <p>{message || "Dummy text"}</p>
            <div>
            <small>{localTime || "Time stamp"}</small>
            </div>
            
        </div>
    )
}

export default Message

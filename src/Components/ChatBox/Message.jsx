import React from 'react'
import { useSelector } from 'react-redux'

function Message({data={}}) {
    const {author,message,isRead,time} = data
    const {displayName}= useSelector(store=>store.auth.user)
    return (
        <div className={`message flexBox ${author !== displayName? "received" : "sent"}`}>
            <p>{message || "Dummy text"}</p>
            <div>
            <small>{time || "Time stamp"}</small>
            </div>
            
        </div>
    )
}

export default Message

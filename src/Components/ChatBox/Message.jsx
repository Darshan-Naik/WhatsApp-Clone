import React from 'react'
import { useSelector } from 'react-redux'

function Message({data={}}) {
    const {author,message,isRead,time,authorPhoto} = data //message data
    const {displayName}= useSelector(store=>store.auth.user) // current user name 

    const localTime =  new Date(time.toDate()).toLocaleTimeString()//converting universal message time to local time

    return (
            // changing message style based on received / sent
        <div className={`message flexBox ${author !== displayName? "received" : "sent"}`}>
            <p>{message}</p>
            <div>
            <small>{localTime==="Invalid Date"?  "": localTime}</small>
            </div>
            
        </div>
    )  // rendering message
}

export default Message

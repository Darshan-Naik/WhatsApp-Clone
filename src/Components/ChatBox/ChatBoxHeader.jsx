import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from 'react-router';
function ChatBoxHeader({messages}) {
    const {UserName} = useParams()
    return (
        <div className="chatBoxHeader flexBox">
            <Avatar />
            <div className="chatBoxHeaderUserDetails">
                <h3>{UserName}</h3>
                <p>Last Seen {messages[messages.length-1]?.data.time || "While ago"} </p>
            </div>
            <div>
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </div>
        </div>
    )
}

export default ChatBoxHeader

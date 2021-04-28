import React from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

function ChatBoxHeader({messages}) {
    const {UserName} = useParams() //current chat room (receiver's )  user name 
    const {photoURL} = useSelector(store=>store.auth.user) //current user profile photo
    const [photo,setPhoto] = React.useState("") // current chat room users (receiver's ) profile pics

    //Updating current chat room users (receiver's ) profile pics
    React.useEffect(()=>{
      const filteredMessage =  messages.filter(message=>message.data.authorPhoto !== photoURL)
      setPhoto(filteredMessage[filteredMessage.length -1]?.data.authorPhoto)
    },[messages])

    //converting universal message time to local time for last seen
    const localTime = new Date( messages[messages.length-1]?.data.time?.seconds).toLocaleTimeString()

    //Chat box header rendering 
    return (
        <div className="chatBoxHeader flexBox">
            <Avatar src={photo}/>
            <div className="chatBoxHeaderUserDetails">
                <h3>{UserName}</h3>
                <p>Last Seen {
                localTime || "While ago"} </p>
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

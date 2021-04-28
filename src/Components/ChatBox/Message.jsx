import React from 'react'
import { useSelector } from 'react-redux'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { database } from '../../Firebase/firebase';
import { useParams } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';

function Message({data={},id}) {
    const {author,message,isRead,time,authorPhoto} = data //message data
    const {displayName}= useSelector(store=>store.auth.user) // current user name 
    const [visible,setVisible] = React.useState(false)
    const [edit,setEdit] = React.useState(false)
    const localTime =  new Date(time.toDate()).toLocaleTimeString()//converting universal message time to local time
    let {ChatId} = useParams() // current chat-room id
    const [editMessage,setEditMessage] = React.useState(message) // for edit message state
    const handleMessageDelete =()=>{
        database.collection("ChatRooms").doc(ChatId).collection("messages").doc(id).delete()
    } //sent message delete
    const handleMessageEdit =()=>{
        setVisible(false)
        setEdit(true)
    } //sent message Edit

    const handleMessageSubmit =()=>{
        if(editMessage) {
            database.collection("ChatRooms").doc(ChatId).collection("messages").doc(id).update({message:editMessage})
        } else {
            database.collection("ChatRooms").doc(ChatId).collection("messages").doc(id).delete()
        }    
        setEdit(false)   
    } //sent message Edit
    const handleCancel =()=>{
        setVisible(false)
        setEdit(false) 
    } // cancel message edit
    return (
            // changing message style based on received / sent
        <div className={`message flexBox ${author !== displayName? "received" : "sent"}`} onMouseEnter={()=>setVisible(true)} onMouseLeave={handleCancel}>
            <p>{message}</p>
            <div className="messageTime">
            <small>{localTime==="Invalid Date"?  "": localTime}</small>
            </div>
            {author === displayName && visible && (<div className="messageEditBox">            
                <IconButton size="small" color="primary" onClick={handleMessageEdit} >
                <EditIcon />
                </IconButton>
                <IconButton size="small" color="secondary" onClick={handleMessageDelete}>
                <HighlightOffIcon/>
                </IconButton>
            </div>)}
            {edit && (<div className="messageEditBoxInput flexBox">
                <input type="text" value={editMessage} onChange={(e)=>setEditMessage(e.target.value)}/>
                <IconButton size="small" color="primary" onClick={handleMessageSubmit}>
                <SaveIcon/>
                </IconButton>

            </div>
                )}
        </div>
    )  // rendering message
}

export default Message

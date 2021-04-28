import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'

function UserCard({id,name,photoURL}) {
    const [messages,setMessages] =React.useState([]) //current chat-room messages (consuming last ever message and unread messages)
    const [unreadCount,setUnreadCount] =React.useState(0) //unread message count
    const history = useHistory()
    const {ChatId} = useParams()
    const {displayName} = useSelector(store=>store.auth.user)
  
    const handleClick=()=>{
        history.push("/user/"+name + "/" + id)
    }  //redirection to selected chat-room

    
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(id).collection("messages")
        .orderBy("time","desc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        ))
        return ()=>{
            unsubscribe()
        }
    },[id]) //Collection current chat room messages 
    
        React.useEffect(()=>{
            setUnreadCount(messages.filter(message=>message.data.author !==displayName && !message.data.isRead).length)
        },[messages]) //updating unread message count

    
    const localTime =new Date(messages[0]?.data?.time?.toDate()).toLocaleTimeString() //converting universal message time to local time for last seen

    
    return (
        <div onClick={handleClick} className={`flexBox userCard ${ChatId===id && "activeUser"}`}>
            <div className="userCardMain flexBox">
            <Avatar src={photoURL}/>
                <div  className="userCardMainDetails">
                  <div className="userName flexBox">
                  <h3>{name}</h3>
                 {unreadCount? <div className="newMessageDot"><strong>{unreadCount}</strong></div> : null}
                      </div>  
                    <p>{messages[0]?.data.message}</p>
                </div>
            </div>
            <div className="userCardTimeStamp">
                <small>{ localTime === "Invalid Date"? "While ago" : localTime }</small>      
            </div>            
        </div>
    ) //Rendering users chat room card
}

export default UserCard

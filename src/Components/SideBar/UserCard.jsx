import { Avatar } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'

function UserCard({id,name,photoURL}) {
    const [messages,setMessages] = React.useState([]) //current chat-room messages (consuming last ever message only)
    const history = useHistory()
    const {ChatId} = useParams()

    //redirection tto selected chat-room
    const handleClick=()=>{
        history.push("/user/"+name + "/" + id)
    } 

    //Collection current chat room messages 
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(id).collection("messages")
        .orderBy("time","desc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        ))
        return ()=>{
            unsubscribe()
        }
    
    },[id])

    //Rendering users chat room card
    return (
        <div onClick={handleClick} className={`flexBox userCard ${ChatId===id && "activeUser"}`}>
            <div className="userCardMain flexBox">
            <Avatar src={photoURL}/>
                <div  className="userCardMainDetails">
                    <h3>{name}</h3>
                    <p>{messages[0]?.data.message}</p>
                </div>
            </div>
            <div className="userCardTimeStamp">
                <small>{new Date(messages[0]?.data.time?.seconds).toLocaleTimeString() }</small>
            </div>
            
        </div>
    )
}

export default UserCard

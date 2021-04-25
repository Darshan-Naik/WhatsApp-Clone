import { Avatar } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'

function UserCard({id,name}) {
    const [messages,setMessages] = React.useState([])
    const history = useHistory()
    const handleClick=()=>{
        history.push("/user/"+name + "/" + id)
    }
    console.log(name)
    const {ChatId} = useParams()
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(id).collection("messages")
        .orderBy("time","desc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        ))
        return ()=>{
            unsubscribe()
        }
    
    },[id])
    return (
        <div onClick={handleClick} className={`flexBox userCard ${ChatId===id && "activeUser"}`}>
            <div className="userCardMain flexBox">
            <Avatar/>
                <div  className="userCardMainDetails">
                    <h3>{name}</h3>
                    <p>{messages[0]?.data.message}</p>
                </div>
            </div>
            <div className="userCardTimeStamp">
                <small>{messages[0]?.data.time}</small>
            </div>
            
        </div>
    )
}

export default UserCard

import React from 'react'
import ChatBody from './ChatBody'
import "./ChatBox.css"
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxFooter from './ChatBoxFooter'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'
function ChatBox(props) {
    const [messages,setMessages] = React.useState([])
    let {ChatId} = useParams()
    const history = useHistory()
  
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(ChatId).collection("messages")
        .orderBy("time","asc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        ))
        return ()=>{
            unsubscribe()
        }
    
    },[ChatId])
    React.useEffect(()=>{
        if(!ChatId && props?.ChatId){
            history.push("/user/"+props?.name + "/" + props?.ChatId)
        }
    },[props])
    
    return (
        <div className="chatBox flexColumn">
            <ChatBoxHeader messages={messages} />
            <ChatBody messages={messages}/>
            <ChatBoxFooter />
        </div>
    )
}

export default ChatBox

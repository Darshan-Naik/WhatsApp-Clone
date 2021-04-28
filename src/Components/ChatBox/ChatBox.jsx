import React from 'react'
import ChatBody from './ChatBody'
import "./ChatBox.css"
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxFooter from './ChatBoxFooter'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'

function ChatBox(props) {
    const [messages,setMessages] = React.useState([]) // current chat-room messages 
    let {ChatId} = useParams() // current chat-room id
    const history = useHistory()
    
    //Collecting current chat room messages 
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(ChatId).collection("messages")
        .orderBy("time","asc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()})))
        ))
        return ()=>{
            unsubscribe()
        }
    
    },[ChatId])

    // if not chat room id redirection to default chat room
    React.useEffect(()=>{
        if(!ChatId && props?.ChatId){
            history.push("/user/"+props?.name + "/" + props?.ChatId)
        }
    },[props])
    
    //rendering main chat component 
    return (
        <div className="chatBox flexColumn">
            <ChatBoxHeader messages={messages} />
            <ChatBody messages={messages}/>
            <ChatBoxFooter disabled={!props?.users?.length} />
        </div>
    )
}

export default ChatBox

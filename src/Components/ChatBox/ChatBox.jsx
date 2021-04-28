import React from 'react'
import ChatBody from './ChatBody'
import "./ChatBox.css"
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxFooter from './ChatBoxFooter'
import { useHistory, useParams } from 'react-router'
import { database } from '../../Firebase/firebase'
import { useSelector } from 'react-redux'

function ChatBox(props) {
    const [messages,setMessages] = React.useState([]) // current chat-room messages 
    let {ChatId} = useParams() // current chat-room id
    const history = useHistory()
    const {displayName} = useSelector(store=>store.auth.user)

    
    React.useEffect(()=>{
        const unsubscribe  =  database.collection("ChatRooms").doc(ChatId).collection("messages")
        .orderBy("time","asc").onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>{
                if(doc.data().author !==displayName && !doc.data().isRead){
                    database.collection("ChatRooms").doc(ChatId).collection("messages").doc(doc.id).update({isRead:true})
                } 
              
               return {id:doc.id,data:doc.data()}
            }))
        ))
        return ()=>{
            unsubscribe()
        }
    
    },[ChatId]) //Collecting current chat room messages and updating read status

    
    React.useEffect(()=>{
        if(!ChatId && props?.ChatId){
            history.push("/user/"+props?.name + "/" + props?.ChatId)
        }
    },[props]) // if not chat room id redirection to default chat room
    
   
    return (
        <div className="chatBox flexColumn">
            <ChatBoxHeader messages={messages} />
            <ChatBody messages={messages}/>
            <ChatBoxFooter disabled={!props?.users?.length} />
        </div>
    )  //rendering main chat component 
}

export default ChatBox

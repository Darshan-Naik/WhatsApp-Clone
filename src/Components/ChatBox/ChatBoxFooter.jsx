import React from 'react'
import { IconButton } from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { database } from '../../Firebase/firebase';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
function ChatBoxFooter() {
    const [message,setMessage] = React.useState("")
    const {ChatId} = useParams()
    const {displayName,photoURL}= useSelector(store=>store.auth.user)
    const { transcript, resetTranscript } = useSpeechRecognition()
    React.useEffect(()=>{
        setMessage(transcript)
    },[transcript])
    const handleVoice=()=>{
        resetTranscript()
        SpeechRecognition.startListening()    
    }
    const handleSend=(e)=>{
        e.preventDefault()
        if(message && ChatId){ 
            const payload ={
                    author : displayName,
                    isRead : false,
                    message,
                    time : new Date(),
                    authorPhoto : photoURL
            }
            database.collection("ChatRooms")
            .doc(ChatId).collection("messages")
            .add(payload)
        }
        setMessage("")
    }
    return (
        <div className="chatBoxFooter flexBox">
             <IconButton>
                <InsertEmoticonIcon />
            </IconButton>
            <form onSubmit={handleSend}>
                <input type="text" placeholder="Type a message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            </form>
            <IconButton onClick={handleSend}>
                <SendIcon />
            </IconButton>
            <IconButton onClick={handleVoice}>
                <MicIcon />
            </IconButton>
        </div>
    )
}

export default ChatBoxFooter

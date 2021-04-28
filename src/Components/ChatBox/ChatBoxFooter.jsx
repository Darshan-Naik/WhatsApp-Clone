import React from 'react'
import { IconButton } from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { database } from '../../Firebase/firebase';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function ChatBoxFooter({disabled}) {
    const [message,setMessage] = React.useState("") //new message state
    const {ChatId} = useParams()  // current chat room id
    const focus = React.useRef()  // new message input element reference 
     const {displayName,photoURL}= useSelector(store=>store.auth.user) // current user name and photo
     const [emoji,setEmoji] = React.useState(false)

    const { transcript, resetTranscript } = useSpeechRecognition() // voice recognition system

   
    React.useEffect(()=>{
        setMessage(transcript)
        focus.current.focus()
    },[transcript])  //voice typing 

    
    const handleVoice=()=>{
        setEmoji(false)
        resetTranscript()
        SpeechRecognition.startListening()    
    } //enable vice recognition 

    const handleEmoji=(emoji)=>{
        setMessage(message + emoji.native)
    } // emoji typing
    
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
        setEmoji(false)
    } //new message handling (sending)

   
    return (
        <div className="flexColumn">
        <div className="chatBoxFooter flexBox" >
             <IconButton onClick={()=>setEmoji(!emoji)}>
                <InsertEmoticonIcon />
            </IconButton>
            <form onSubmit={handleSend}>
                <input disabled={disabled} ref={focus} type="text" placeholder="Type a message" value={message} onChange={(e)=>setMessage(e.target.value)} onClick={()=>setEmoji(false)} />
            </form>
            <IconButton onClick={handleSend}>
                <SendIcon />
            </IconButton>
            <IconButton onClick={handleVoice}>
                <MicIcon />
            </IconButton>
            
        </div>
        {/* emojis component */}
      {emoji&&  <Picker set='google' onClick={handleEmoji}/>}
        </div>
    )  //rendering chat box footer 
} 

export default ChatBoxFooter

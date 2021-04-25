
import React from 'react'
import Message from './Message'

function ChatBody({messages}) {
   const scroll = React.useRef()
   React.useEffect(()=>{
    scroll.current.scroll(0,2000)
   },[messages])
    return (
        <div ref={scroll} className="chatBody flexColumn scroll" >
            <div className="spaceFiller flexBox">

                {!messages.length && (
                    <p>Start new conversation</p>
                )}
            </div>
            {messages.map(message=><Message key={message.id} data={message.data} />)}
        </div>
    )
}

export default ChatBody

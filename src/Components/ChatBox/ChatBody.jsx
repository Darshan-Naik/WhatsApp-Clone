
import React from 'react'
import Message from './Message'

function ChatBody({messages}) {
   const scroll = React.useRef() //scroll reference element for auto scroll function 

    
   React.useEffect(()=>{
    scroll.current.scroll(0,200000)
   },[messages]) // auto scrolling chat body on load 

    
    return (
        <div ref={scroll} className="chatBody flexColumn scroll" >
            <div className="spaceFiller flexBox">
                {/* if no messages wel-come element rendering */}
                {!messages.length && (
                    <p>Start new conversation</p>
                )}
            </div>
          {/* rendering messages  */}
            {messages.map(message=><Message key={message.id} id={message.id} data={message.data} />)}
        </div>
    ) //Main chat body rendering
}

export default ChatBody

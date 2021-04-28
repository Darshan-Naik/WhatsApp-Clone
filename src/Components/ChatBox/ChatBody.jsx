
import React from 'react'
import Message from './Message'

function ChatBody({messages}) {
   const scroll = React.useRef() //scroll reference element for auto scroll function 

    // auto scrolling chat body on load 
   React.useEffect(()=>{
    scroll.current.scroll(0,200000)
   },[messages]) 

    //Main chat body rendering
    return (
        <div ref={scroll} className="chatBody flexColumn scroll" >
            <div className="spaceFiller flexBox">
                {/* if no messages wel-come element rendering */}
                {!messages.length && (
                    <p>Start new conversation</p>
                )}
            </div>
          {/* rendering messages  */}
            {messages.map(message=><Message key={message.id} data={message.data} />)}
        </div>
    )
}

export default ChatBody

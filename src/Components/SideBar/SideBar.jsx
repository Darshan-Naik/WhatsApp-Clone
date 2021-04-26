import React from 'react'
import SideBarHeader from './SideBarHeader'
import SideBarSearchBox from './SideBarSearchBox'
import UserCard from './UserCard'
import "./SideBar.css"
import { database } from '../../Firebase/firebase'
import { useSelector } from 'react-redux'

function SideBar({users}) {
const [chatRoom,setChatRoom] = React.useState([])
const {email,displayName} = useSelector(store=>store.auth.user)
    React.useEffect(()=>{
      const  unsubscribe=  database.collection("ChatRooms")
      .where("authors", "array-contains",email )
      .onSnapshot(snapshot=>{
            setChatRoom(snapshot.docs.map(doc=>({id:doc.id,data : doc.data()})))
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const getPic=(email)=>{
        for(let i=0;i<users.length;i++){
            if(users[i].email === email[0]){
                return users[i].photoURL
            }
        }
            
                
            
    }


    return (
        <div className="sideBar flexColumn">
            <SideBarHeader />
            <SideBarSearchBox />
            <div className="sideBarUserBox flexColumn scroll" >
                {!chatRoom.length && (
                    <div className="noContacts flexColumn" >
                         <h3>Start new conversation </h3>
                         <p> Add new contact by email id</p>
                    </div>
                )}
            {chatRoom?.map(room=>(<UserCard key={room.id} id={room.id}
             name={room.data.authorNames.filter(name=>name!==displayName)}
             photoURL={getPic(room.data.authors.filter(item=>item!==email))}
             />)
             )}
            </div>
           

        </div>
    )
}

export default SideBar

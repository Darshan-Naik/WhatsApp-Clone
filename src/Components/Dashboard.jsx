import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { database } from '../Firebase/firebase'
import ChatBox from './ChatBox/ChatBox'
import SideBar from './SideBar/SideBar'

function Dashboard() {
    const isAuth = useSelector(store=>store.auth.isAuth)
    const [chatRoom,setChatRoom] = React.useState([])
    const [users,setUsers] = React.useState([])
    const {email} = useSelector(store=>store.auth.user)
    React.useEffect(()=>{
      const  unsubscribe = email && database.collection("ChatRooms")
      .where("authors", "array-contains",email )
      .onSnapshot(snapshot=>{
            setChatRoom(snapshot.docs.map(doc=>({id:doc.id,data : doc.data()})))
        })
        return ()=>{
            unsubscribe &&  unsubscribe()
        }
    },[])
    React.useEffect(()=>{
        const  unsubscribe = database.collection("users")
        .onSnapshot(snapshot=>{
            setUsers(snapshot.docs.map(doc=>(doc.data())))
          })
          return ()=>{
             unsubscribe()
          }
      },[])
    return isAuth? (
        <>
          <SideBar users={users} />
            <ChatBox users={users} ChatId={chatRoom[0]?.id} name={chatRoom[0]?.data.authorNames[0]}/>
        </>
    ) :<Redirect to="/login" />
}

export default Dashboard

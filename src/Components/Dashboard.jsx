import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import app, { database } from '../Firebase/firebase'
import { logout } from '../Redux/auth/actions'
import ChatBox from './ChatBox/ChatBox'
import SideBar from './SideBar/SideBar'

function Dashboard() {
    const isAuth = useSelector(store=>store.auth.isAuth) //auth state info
    const [chatRoom,setChatRoom] = React.useState([])   // user private chat rooms 
    const [users,setUsers] = React.useState([])    // all registered users 
    const {email,displayName} = useSelector(store=>store.auth.user)  // current user email-id and name

    const dispatch = useDispatch()

    
    React.useEffect(()=>{
      const  unsubscribe = email && database.collection("ChatRooms")
      .where("authors", "array-contains",email )
      .onSnapshot(snapshot=>{
            setChatRoom(snapshot.docs.map(doc=>({id:doc.id,data : doc.data()})))
        }) 
      
        return ()=>{
            unsubscribe &&  unsubscribe()
        }  // Clean up for live chat-room data subscription
    },[]) //Collecting User Chat-Rooms from dataBase on load

   
    React.useEffect(()=>{
        app.auth().onAuthStateChanged((user)=>{
            if (!user) {
                dispatch(logout())
            }
          });
    },[])  //Checking user auth state on load

   
    React.useEffect(()=>{
        const  unsubscribe = database.collection("users")
        .onSnapshot(snapshot=>{
            setUsers(snapshot.docs.map(doc=>(doc.data())))
          })
          
          return ()=>{
             unsubscribe()
          } // Clean up for live registered-users  data subscription
      },[])  //Collection all registered users details 

      
    return isAuth? (
        <>
            <SideBar chatRoom={chatRoom} users={users} />

            {/* default chat-room for first load ) */}
            <ChatBox users={users} ChatId={chatRoom[0]?.id} name={chatRoom[0]?.data.authorNames.filter(name=>name !== displayName)[0]}/> 
        </>
    ) :<Redirect to="/login" /> //Redirecting user to log-in page if user is not logged in 
} //Dashboard rendering based on Auth state

export default Dashboard

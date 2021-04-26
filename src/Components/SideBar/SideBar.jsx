import React from 'react'
import SideBarHeader from './SideBarHeader'
import SideBarSearchBox from './SideBarSearchBox'
import UserCard from './UserCard'
import "./SideBar.css"
import { database } from '../../Firebase/firebase'
import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'

function SideBar({users}) {
const [chatRoom,setChatRoom] = React.useState([])
const [search,setSearch] = React.useState(false)
const [result,setResult] = React.useState([])
const filtererUsers =React.useRef([])
const [query,setQuery] = React.useState("")
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
    React.useEffect(()=>{
             users.forEach(user=>{
                let flag = false;
                for(let i=0;i<chatRoom.length;i++){
                    if(JSON.stringify(chatRoom[i]).includes(user.email)){
                            flag = true;
                            break;
                    }
                }
                if(!flag){
                    filtererUsers.current.push(user)
                }
            })
            return ()=>{
                filtererUsers.current.length=0;
            }    
      },[users,chatRoom])

    React.useEffect(()=>{
        setResult(filtererUsers.current.filter(user=>user.email.includes(query) || user.name.toLowerCase().includes(query) ))
        if(query){
            setSearch(true)
        } else{
            setSearch(false)
        }       
        },[query,filtererUsers.current])

    const getPic=(email)=>{
        for(let i=0;i<users.length;i++){
            if(users[i].email === email[0]){
                return users[i].photoURL
            }
        }             
    }
    const handleQuery =(e)=>{
        setQuery(e.target.value)
    }
    const resetSearch =()=> {
        setQuery("")
        setSearch(false)
    }
    return (
        <div className="sideBar flexColumn">
            <SideBarHeader />
            <SideBarSearchBox result={result} query={query} handleQuery={handleQuery}/>
                { search? (<div  className="sideBarResultBox flexColumn scroll">
                        {result.map(user=><ResultCard key={user.id} {...user} resetSearch={resetSearch}/>)}
                </div>) :
           (<div className="sideBarUserBox flexColumn scroll" >
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
            </div>)
           }

        </div>
    )
}

export default SideBar

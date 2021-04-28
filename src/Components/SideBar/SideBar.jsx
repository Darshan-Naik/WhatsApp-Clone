import React from 'react'
import SideBarHeader from './SideBarHeader'
import SideBarSearchBox from './SideBarSearchBox'
import UserCard from './UserCard'
import "./SideBar.css"
import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

function SideBar({users,chatRoom}) {
const [search,setSearch] = React.useState(false) //search state flag for conditional rendering
const [result,setResult] = React.useState([])  // searched users results 
const filtererUsers =React.useRef([])  // all users details which are not present in current user contact list
const [query,setQuery] = React.useState("") // search query state
const {email,displayName} = useSelector(store=>store.auth.user) // current user email id
    
    //updating users data based on current user contact details and registered users 
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
      
      //updating search result and search state flag based on search query 
    React.useEffect(()=>{
        setResult(filtererUsers.current.filter(user=>user.email.includes(query) || user.name.toLowerCase().includes(query) ))
        if(query){
            setSearch(true)
        } else{
            setSearch(false)
        }       
        },[query])
    
    //finding chat room pic for the chat room cards
    const getPic=(email)=>{
        for(let i=0;i<users.length;i++){
            if(users[i].email === email[0]){
                return users[i].photoURL
            }
        }             
    }
    
    //updating search query
    const handleQuery =(e)=>{
        setQuery(e.target.value)
    }

    //resetting search query and search state flag when new contact is added
    const resetSearch =()=> {
        setQuery("")
        setSearch(false)
    }

    // Rendering main side bar component
    return (
        <div className="sideBar flexColumn">

            <SideBarHeader />

            <SideBarSearchBox query={query} handleQuery={handleQuery}/>

            {/* if no search result rendering nor result  UI elements */}
                {!result.length && search && <div className="noResult flexBox">
                                    <SentimentVeryDissatisfiedIcon/>
                                    <h3> No users found</h3>
                                    </div>}

            {/* conditional rendering based on search flag */}
            { search? (<div  className="sideBarResultBox flexColumn scroll">
                {/* rendering result users cards   */}
                        {result.map(user=><ResultCard key={user.id} {...user} resetSearch={resetSearch}/>)}
                </div>) :
           (<div className="sideBarUserBox flexColumn scroll" >
                    {/* if no contacts rendering wel come element  */}
                {!chatRoom.length && (
                    <div className="noContacts flexColumn" >
                         <h3>Start new conversation </h3>
                         <p> Add new contact by email id</p>
                    </div>
                )}
            {/*rendering current user's private chat room cards */}
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

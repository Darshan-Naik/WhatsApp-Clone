import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { database } from '../../Firebase/firebase';
import { useSelector } from 'react-redux';

function SideBarSearchBox({query,handleQuery,result}) {
  
    const {displayName,email} = useSelector(store=>store.auth.user)
    const handleSubmit=(e)=>{
            e.preventDefault()
            const name = !result.length && prompt("enter contact name")
            if(name && query && !result.length) {
                const payload = {
                    authorNames : [name,displayName],
                    authors : [email,query]
                }
               database.collection("ChatRooms").add(payload)
            }
        }
    return (
        <div className="SideBarSearchBox">
            <form className="searchBox flexBox" onSubmit={handleSubmit} >
                <SearchIcon className="searchIcon"/>
                <input type="email" value={query} onChange={handleQuery} placeholder="Search or start new conversation"/>
            </form>
        </div>
    )
}

export default SideBarSearchBox

import { Avatar } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { database } from '../../Firebase/firebase'

function ResultCard({name,email:userEmail,photoURL,resetSearch}) {
    const {displayName,email} = useSelector(store=>store.auth.user) //current user name and email for new chat room creation

    // new chat room creation 
    const handleSubmit=()=>{
            const payload = {
                authorNames : [name,displayName],
                authors : [email,userEmail]
            }
            if(email !== userEmail){
                database.collection("ChatRooms").add(payload)
            }    
           resetSearch();
    }

// rendering search result card
    return (
        <div className="resultCard flexBox">
            <div className="flexBox">
            <Avatar src={photoURL} />
            <div>
                <h3>{name}</h3>
                <small>{userEmail}</small>
            </div>
            </div>
            <div>
                <button onClick={handleSubmit}>Add to Contact</button>
            </div>
        </div>
    )
}

export default ResultCard

import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useSelector } from 'react-redux';
function SideBarHeader() {
    const {photoURL} = useSelector(store=>store.auth.user)
    return (
        <div className ="sideBarHeader flexBox">
            <Avatar src ={photoURL}/>
            <div>
            <IconButton>
                <MessageIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            </div>
           
        </div>
    )
}

export default SideBarHeader

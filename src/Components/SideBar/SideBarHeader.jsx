import { Avatar, Button, IconButton } from '@material-ui/core'
import React from 'react'
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../Redux/auth/actions';
import { useHistory } from 'react-router';
function SideBarHeader() {
    const [visible,setVisible] = React.useState(false)
    const {photoURL} = useSelector(store=>store.auth.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogOut = ()=>{
        dispatch(logout())
        history.push("/login")
    }
    return (
        <div className ="sideBarHeader flexBox"  onMouseLeave={()=>setVisible(false)}>
            <Avatar src ={photoURL} onMouseEnter={()=>setVisible(true)}/>
            <div style={{display : `${visible?"block" : "none"}` }}>
                <Button 
                    onClick={handleLogOut}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ExitToAppIcon />}
                            >
                    Sign Out
                 </Button>
            </div>
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

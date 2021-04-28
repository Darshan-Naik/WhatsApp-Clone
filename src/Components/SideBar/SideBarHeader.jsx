import { Avatar, Button, IconButton } from '@material-ui/core'
import React from 'react'
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../Redux/auth/actions';
import { useHistory } from 'react-router';
function SideBarHeader() {
    const [visible,setVisible] = React.useState(false)  //Sign out button visibility flag state
    const {photoURL} = useSelector(store=>store.auth.user) //current user profile photo
    const dispatch = useDispatch()
    const history = useHistory()

    const handleVisible =()=>{
        setVisible(!visible)
            setTimeout(()=>{
                setVisible(false)
            },5000)       
    } // enable sign-out button for 5 sec
   
    const handleLogOut = ()=>{
        dispatch(logout())
        history.push("/login")
    }  //Logout function 


    return (
        <div className ="sideBarHeader flexBox"  >
            <Avatar src ={photoURL} />
            {/* conditionally rendering sign-out button */}
            { visible && ( <div>
                    <Button 
                        onClick={handleLogOut}
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<ExitToAppIcon />}
                                >
                        Sign Out
                    </Button>
                </div>)} 
            <div>
            <IconButton >
                <MessageIcon />
            </IconButton>
            <IconButton onClick={handleVisible} >
                <MoreVertIcon />
            </IconButton>
            </div>
           
        </div>
    )
}

export default SideBarHeader

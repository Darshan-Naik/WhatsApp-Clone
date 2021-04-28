import React from 'react'
import { Avatar, Backdrop, Button, Fade, IconButton, Modal } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import CancelIcon from '@material-ui/icons/Cancel';
import { database } from '../../Firebase/firebase';

function ChatBoxHeader({messages}) {
    const [visible,setVisible] = React.useState(false)  //Delete button visibility flag state
    const {UserName,ChatId} = useParams() //current chat room (receiver's )  user name 
    const {photoURL,displayName} = useSelector(store=>store.auth.user) //current user profile photo
    const [photo,setPhoto] = React.useState("") // current chat room users (receiver's ) profile pics
    const [open,setOpen] = React.useState(false)  //Delete modal visibility flag state
    const timer = React.useRef() // timer reference
    const [timeCount,setTimeCount] = React.useState(5) // timer count
    const history =useHistory()

    React.useEffect(()=>{
      const filteredMessage =  messages.filter(message=>message.data.authorPhoto !== photoURL)
      setPhoto(filteredMessage[filteredMessage.length -1]?.data)
    },[messages]) //Updating current chat room users (receiver's ) profile pics

    const handleVisible =()=>{
        setVisible(!visible)
            setTimeout(()=>{
                setVisible(false)
            },5000)
    } // enable delete button for 5 sec
    const deletePopup =()=>{
        setOpen(true)
        timer.current = setInterval(()=>{
                        setTimeCount(time=>time-1)
        },1000)
    } // Delete confirmation model popup

    React.useEffect(()=>{
        if(!timeCount){
            setOpen(false)
            clearInterval(timer.current)
            setTimeCount(5)
        }
    },[timeCount]) // resetting timer of Delete confirmation model popup

    const handleClose =()=>{
        setOpen(false)
    }// Delete confirmation model popup close

    const handleDelete=()=>{
        database.collection("ChatRooms").doc(ChatId).delete()
        .then(()=>{
            setOpen(false)
            setVisible(false)
            setTimeout(()=>{
                history.push("/")
            },400)
           
        })
        .catch(()=>{
            alert("something went wrong")
        })
    } // Delete conversion /chat room from data base

    const localTime = new Date(photo?.time?.toDate()).toLocaleString() //converting universal message time to local time for last seen

    
    return (
        <div className="chatBoxHeader flexBox">
            <Avatar src={photo?.authorPhoto}/>
            <div className="chatBoxHeaderUserDetails">
                <h3>{UserName}</h3>
                <p>Last Seen {
                localTime==="Invalid Date"? "While ago" : localTime} </p>
            </div>
            { visible && ( <div>
                    <Button 
                        onClick={deletePopup}
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteSweepIcon />}
                                >
                        Delete Conversation
                    </Button>
                </div>)} 

                <Modal
                    className="flexBox"
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-button"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    >
                    <Fade in={open}>
                        <div className="deleteModalBox">
                            <h3 id="transition-modal-title">Are you sure you want to delete this Conversion?</h3>
                            <div className="flexBox">            
                                <Button 
                                onClick={handleDelete}
                                variant="contained"
                                color="secondary"
                                size="small"
                                startIcon={<DeleteForeverIcon />}
                                        >
                                Delete
                                </Button>
                                <Button 
                                    onClick={handleClose}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<CancelIcon />}
                                            >
                                    Cancel in {timeCount}
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>

            <div>
            <IconButton>
                <AttachFileIcon />
            </IconButton>
            <IconButton  onClick={handleVisible}>
                <MoreVertIcon />
            </IconButton>
            </div>
        </div>
    ) //Chat box header rendering 
}

export default ChatBoxHeader

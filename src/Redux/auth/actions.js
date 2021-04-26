import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionTypes"


const loginRequest =()=>{
    return {
        type:LOGIN_REQUEST
    }
}
const loginFailure =()=>{
    return {
        type:LOGIN_FAILURE
    }
}
const loginSuccess =(payload)=>{
    return {
        type:LOGIN_SUCCESS,
        payload
    }
}
const logout =()=>{
    return {
        type:LOGOUT
    }
}
export { loginFailure,loginSuccess,loginRequest,logout}
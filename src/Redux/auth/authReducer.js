import { loadData, saveData } from "../../Utils/localStorage"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionTypes"


const init = loadData("auth") || {
    isAuth : false,
    user : {},
    isLoading : false,
    isError : false,
    credential : {},
    token : ""
}

export const authReducer =(state=init,{type,payload})=>{

    switch (type){
            case LOGIN_REQUEST : {
                return {
                    ...state,
                    isLoading : true
                }
            }
            case LOGIN_FAILURE : {
                return {
                    ...state,
                    isLoading : false,
                    isError : true
                }
            }
            case LOGIN_SUCCESS : {
                const newState = {
                    ...state,
                    isLoading : false,
                    isAuth : true,
                    user : payload.user,
                    token : payload.token,
                    credential : payload.credential
                }
                saveData("auth",newState)
                return newState
            }
            default : return state
    }

}
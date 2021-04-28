import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import app, { database, provider } from '../../Firebase/firebase';
import { loginRequest, loginSuccess } from '../../Redux/auth/actions';
import "./Login.css"
function Login() {

    const dispatch = useDispatch()

    const isAuth = useSelector(store=>store.auth.isAuth) // current user auth state

      //main log-in function
      const login=()=>{
        dispatch(loginRequest())

        //Google sign in / register
        app.auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          const credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
         // adding new user information to database         
        database.collection("users").where("email", "==",user.email ).get()
        .then(res=>{
            if(!res.docs.length) {
              const payload = {
                  id:user.uid,
                  name : user.displayName,
                  email : user.email,
                  photoURL : user.photoURL
              }
            database.collection("users").add(payload)
          }
        })
        
          dispatch(loginSuccess({user,credential,token}))
        })
        //catching login /register errors
        .catch((error) => {
        alert(error.message)
        });
      } 
      
      //rendering login component based on auth state
        return isAuth?<Redirect to="/" /> : (
            <div className="login flexBox flexColumn">
                <img src="logo.png" alt="Logo"/>
                <h1>WhatsApp</h1>
                <button onClick={login}>Sign-in with Google</button>
                <p>Powered by <strong>React JS - Firebase</strong> | Designed by <strong>Darshan Naik</strong> </p>
            </div>
        )
}

export default Login

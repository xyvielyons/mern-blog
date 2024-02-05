import React from 'react'
import {Button} from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider,signInWithPopup,getAuth} from "firebase/auth"
import {app} from "../firebase/firebase.js" 
import authFetch from '../axios/custom'
import {useDispatch} from "react-redux"
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice"
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const auth = getAuth(app)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt:"select_account"})
    const handleGoogleClick = async()=>{
        try {
            const resultsFromGoogle = await signInWithPopup(auth,provider)
            console.log(resultsFromGoogle)
            const res = await authFetch.post("/auth/google",{
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            })
            if(res.data.status === "success"){
              dispatch(signInSuccess(res.data.data))
              navigate("/")
            }
            
        } catch (error) {
            console.log(error);
            
        }
        

    }
  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline className='mt-2' onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'></AiFillGoogleCircle>
        Continue with Google
    </Button>
  )
}

import React,{useState} from 'react'
import { Label, TextInput,Button,Alert, Spinner } from 'flowbite-react'
import {Link,useNavigate} from "react-router-dom"
import authFetch from '../axios/custom';
import {useDispatch,useSelector} from "react-redux"
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice"

export default function Signin() {
  const [formData,setFormData]=useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error:errorMessage} = useSelector(state=>state.user)
 
const handlechange = (e)=>{
  
  setFormData({...formData, [e.target.id]: e.target.value.trim()})
  console.log(formData)
}

const handleSubmit = async (e)=>{
  e.preventDefault()
  if(!formData.email || !formData.password){
    return dispatch(signInFailure("please fill all the fields"))
  }
  try{
    
    // setLoading(true)
    // setErrorMessage(null)
    dispatch(signInStart)
    const res = await authFetch.post("/auth/signin",formData);
    console.log(res)
    if(res.data.status=== "success"){
      // setErrorMessage(res.data.message)
      dispatch(signInSuccess(res.data.user))
      navigate("/")
     
      
    }
    
    
  }catch(error){
    // setErrorMessage(error.message)
    // setLoading(false)
    dispatch(signInFailure(error.message))
  }

  

}


  return (
    <div className='min-h-screen mt-20 '>

      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

          <div className='flex-1'>
                <Link to="/" className='font-bold dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 to-pink-500 rounded-lg text-white'>Xaviers</span> Blog
                </Link>
                <p className='text-sm mt-5'>
                 you can sign in with your email or password 
                </p>
          </div>

        <div className='flex-1'>
          <form className='flex flex-col gap 4' onSubmit={handleSubmit}>
           
            <div className=''>
            <Label value="your email"/>
            <TextInput type="email" placeholder='name@company.com' id='email' onChange={handlechange}></TextInput>
            </div>
            <div className=''>
            <Label value="your password"/>
            <TextInput type="password"  id='password' onChange={handlechange} placeholder="************"></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" className='mt-5' disabled={loading}>
              {
                loading ? 
                  <>
                  <Spinner size="sm"/>
                  <span className='pl-3'>Loading...</span>
                  </>

                :"Sign In"
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to="/sign-up" className='text-blue-500'>Sign Up</Link>
          </div>
          
          {
            errorMessage && 
             <Alert className='mt-5' color="failure">
              {errorMessage}
             </Alert>
            
          }
        </div>

        
        </div>
      
      </div>
  )
}

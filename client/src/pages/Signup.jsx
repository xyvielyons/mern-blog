import React,{useState} from 'react'
import { Label, TextInput,Button,Alert, Spinner } from 'flowbite-react'
import {Link,useNavigate} from "react-router-dom"
import authFetch from '../axios/custom';
import OAuth from '../components/OAuth';
export default function Signup() {
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]= useState(false)
  const navigate = useNavigate();
const handlechange = (e)=>{
  
  setFormData({...formData, [e.target.id]: e.target.value.trim()})
  console.log(formData)
}

const handleSubmit = async (e)=>{
  e.preventDefault()
  if(!formData.username || !formData.email || !formData.password){
    return setErrorMessage("please fill out all fields")
  }
  try{
    
    setLoading(true)
    setErrorMessage(null)
    const res = await authFetch.post("/auth/signup",formData);
    console.log(res)
    if(res.data.status=== "success"){
      setErrorMessage(res.data.message)
      navigate("/sign-in")
      
    }
    
    setLoading(false)
  }catch(error){
    setErrorMessage(error.message)
    setLoading(false)
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
                  this is a my BLOG website you can sign up with your email and password or Google
                </p>
          </div>

        <div className='flex-1'>
          <form className='flex flex-col gap 4' onSubmit={handleSubmit}>
            <div className=''>
            <Label value="your username"/>
            <TextInput type="text" placeholder='Username' id='username' onChange={handlechange}></TextInput>
            </div>
            <div className=''>
            <Label value="your email"/>
            <TextInput type="email" placeholder='name@company.com' id='email' onChange={handlechange}></TextInput>
            </div>
            <div className=''>
            <Label value="your password"/>
            <TextInput type="password" placeholder='Password' id='password' onChange={handlechange}></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" className='mt-5' disabled={loading}>
              {
                loading ? 
                  <>
                  <Spinner size="sm"/>
                  <span className='pl-3'>Loading...</span>
                  </>

                :"sign up"
              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
          <OAuth></OAuth>
          
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

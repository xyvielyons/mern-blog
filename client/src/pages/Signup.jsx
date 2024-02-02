import React from 'react'
import { Label, TextInput,Button } from 'flowbite-react'
import {Link} from "react-router-dom"

export default function Signup() {
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
          <form className='flex flex-col gap 4'>
            <div className=''>
            <Label value="your username"/>
            <TextInput type="text" placeholder='Username' id='username'></TextInput>
            </div>
            <div className=''>
            <Label value="your email"/>
            <TextInput type="text" placeholder='Email' id='email'></TextInput>
            </div>
            <div className=''>
            <Label value="your password"/>
            <TextInput type="text" placeholder='Password' id='password'></TextInput>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" className='mt-5'>Sign up</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
        </div>

        
        </div>
      
      </div>
  )
}

import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl items-center rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
          want to learn more about javascript?
        </h2>
        <p className='text-gray-500 my-2'> 
          Checkout this resources with 100 javascript projects
        </p>
        <Button gradientDuoTone="purpleToPink">
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className='rounded-tl-xl rounded-bl-none'>100 js projects</a>
        </Button>

      </div>
      <div className="p-7 flex-1">
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_3840,q_auto" alt="" />
      </div>
      

    </div>
  )
}

/* eslint-disable react/jsx-key */
import React, { useEffect,useState } from 'react'
import authFetch from "./../axios/custom.js"
import {useSelector} from "react-redux"
import {Table} from "flowbite-react"
import {Link} from "react-router-dom"
import { Button, Modal} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck,FaTimes} from "react-icons/fa"


export const DashUsers = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [user,setUser] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] =useState(false)
 const [userIdToDelete,setUserIdToDelete] = useState('')

  
  useEffect(()=>{
     const fetchUsers = async ()=>{
      try{
        const res = await authFetch.get(`/user/getusers`)
        if(res.data.status == "success"){
          setUser(res.data.users)
          if(res.data.users.length < 9){
            setShowMore(false)
          }
        }

      }catch(err){
        console.log(err)

      }
     }
if(currentUser.isAdmin){
  fetchUsers()
}

  },[currentUser._id])


  const handleShowMore = async ()=>{
    const startIndex = user.length;
    try{
      const res = await authFetch.get(`/user/getUsers?startIndex=${startIndex}`)
      setUser((prev)=>[...prev,...res.data.users])
      if(res.data.users.length < 9){
        setShowMore(false)
      }

    }catch(error){
      console.log(error)
    }
  }


  const handleDeleteUser = async()=>{
    setShowModal(false)
    // try{
    //   const res = await authFetch.delete(`/user/deleteuser/${postIdToDelete}/${currentUser._id}`)
    //   setUserPosts((prev)=> prev.filter((post) => post._id !== postIdToDelete)) 
    // }catch(err){
    //   console.log(err)
    // }

  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500'>
      {currentUser.isAdmin && user.length > 0 ? 
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Data created</Table.HeadCell>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          
        </Table.Head>
        
        {user.map((user)=>
            <Table.Body className='divide-y' key={user._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    
                      <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 rounded-full h-10 object-cover bg-gray-500 font-medium text-gray-900 dark:text-white '
                      ></img>
                    
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}

                  </Table.Cell>
                  <Table.Cell>
                      {user.email}                     
                  </Table.Cell>
                  <Table.Cell>
                      {user.isAdmin ? <FaCheck className="text-green-500"/>:<FaTimes className="text-red-500"/>}                     
                  </Table.Cell>
                  <Table.Cell>
                      <span onClick={()=>{
                        setShowModal(true)
                        setUserIdToDelete(user._id)
      


                      }} className='font-medium text-red-500 cursor-pointer hover:undeline'>delete</span>
                     
                  </Table.Cell>
                

              </Table.Row>
              
            </Table.Body>

          )
        }


      </Table>
      {
        showMore && <button onClick={handleShowMore} className='w-full text-sm py-7 text-teal-500 self-center'>Show More</button>
      }
      
      </>
      :
      <p>You have no users yet</p>}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
              <Modal.Header/>
              <Modal.Body>
                 <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure you want to delete the post</h3>
                    <div className="flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeleteUser}>Yes i`m sure</Button>
                        <Button color='gray' onClick={()=>{setShowModal(false)}}>No Cancel</Button>

                    </div>
                 </div>
              </Modal.Body>
        </Modal>
    </div>
  )
}

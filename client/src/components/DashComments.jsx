/* eslint-disable react/jsx-key */
import React, { useEffect,useState } from 'react'
import authFetch from "./../axios/custom.js"
import {useSelector} from "react-redux"
import {Table} from "flowbite-react"
import {Link} from "react-router-dom"
import { Button, Modal} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck,FaTimes} from "react-icons/fa"


export default function DashComments() {
  const {currentUser} = useSelector((state)=>state.user)
  const [comments,setComments] = useState([])
  const [showMore,setShowMore] = useState(true)
  const [showModal,setShowModal] =useState(false)
 const [commentIdToDelete,setCommentIdToDelete] = useState('')

  
  useEffect(()=>{
     const fetchComments = async ()=>{
      try{
        const res = await authFetch.get(`/comment/getComments`)
        if(res.data.status == "success"){
          setComments(res.data.comments)
          if(res.data.comments.length < 9){
            setShowMore(false)
          }
        }

      }catch(err){
        console.log(err)

      }
     }
if(currentUser.isAdmin){
  fetchComments()
}

  },[currentUser._id])


  const handleShowMore = async ()=>{
    const startIndex = comments.length;
    try{
      const res = await authFetch.get(`/user/comment`)
      setComments((prev)=>[...prev,...res.data.comments])
      if(res.data.comments.length < 9){
        setShowMore(false)
      }

    }catch(error){
      console.log(error)
    }
  }


  const handleDeleteComment = async()=>{
    setShowModal(false)
    try{
      const res = await authFetch.delete(`/comment/deleteComment/${commentIdToDelete}`)
      setComments((prev)=> prev.filter((comment) => comment._id !== commentIdToDelete)) 
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? 
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Data updated</Table.HeadCell>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>Numberof likes</Table.HeadCell>
          <Table.HeadCell>commentId</Table.HeadCell>
          <Table.HeadCell>userId</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          
        </Table.Head>
        
        {comments.map((comment)=>
            <Table.Body className='divide-y' key={comment._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                
                  <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    
                     {comment.content}
                    
                  </Table.Cell>
                  <Table.Cell>
                    {comment.numberOfLikes}

                  </Table.Cell>
                  <Table.Cell>
                      {comment._id}                     
                  </Table.Cell>
                  <Table.Cell>
                      {comment.userId}                     
                  </Table.Cell>
                  
                  <Table.Cell>
                      <span onClick={()=>{
                        setShowModal(true)
                        setCommentIdToDelete(comment._id)
      


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
      <p>You have no comments yet</p>}
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
              <Modal.Header/>
              <Modal.Body>
                 <div className="text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>are you sure you want to delete the comment</h3>
                    <div className="flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeleteComment}>Yes i`m sure</Button>
                        <Button color='gray' onClick={()=>{setShowModal(false)}}>No Cancel</Button>

                    </div>
                 </div>
              </Modal.Body>
        </Modal>
    </div>
  )
}

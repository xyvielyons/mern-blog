import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Alert, Button, Textarea} from "flowbite-react"
import authFetch from "./../axios/custom.js"
import Comment from './Comment.jsx'
export const CommentSection = ({postId}) => {
const {currentUser} = useSelector(state => state.user)
const [comment,setComment] = useState('')
const [commentError,setCommentError] = useState(null)
const [comments,setComments] = useState([])
console.log(comments)
const handleSubmit = async (e) => {
e.preventDefault();

try {
  const res = await authFetch.post('/comment/create',{
    content:comment,
    postId,
    userId:currentUser._id
  })
  if(res.data.status == "success"){
    setComment('')
  }
  
} catch (error) {
setCommentError(error.message)
  
}
}

useEffect(()=>{
  const getComments = async ()=>{
    try{
      const res = await authFetch(`/comment/getPostComments/${postId}`)
      if(res.data.status == "success"){
        setComment('')
      setComments(...comments,res.data.comments)
      }

    }catch(err){
      console.log(err)
    }

  }

getComments();
},[postId])



  return (
    <div className='max-w-2xl max-auto w-full p-3'>
         {currentUser ? 
         <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
        <p>Signed in as:</p>
        <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt="" ></img>
                <Link to={'/dashboard?tap=profile'} className='text-xs text-cyan-600 hover:undeline'>
                @{currentUser.username}
                </Link>
       </div>
    
    :<div className='text-sm text-teal-500 my-5 flex gap-1'>
        You must be signed in to comment
        <Link to={"/sign-in"} className='text-blue-500 hover:underline'>Sign In</Link>
        </div>}

        {currentUser && 
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
            <Textarea placeholder="add a comment"
            rows="3"
            maxLength='200'
            onChange={(e)=>setComment(e.target.value)}
            value={comment}/>

           <div className="flex justify-between items-center mt-5">
            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                submit
            </Button>
           </div>
           {commentError &&  <Alert color="failure" className='mt-5'>{commentError}</Alert>}

            
        </form>}
        {comments.length === 0 ? 
        <p className='text-sm my-5'>no comments yet</p>:
        <>
         <div className='text-sm my-5 flex items-center gap-1'>
          <p>Comments</p>
          <div className="border border-gray-400 py-1 px-2 rounded-sm">
            <p>{comments.length}</p>
          </div>
          
          </div>
          {comments.map(comment => 
            <Comment
            key={comment._id}
            comment={comment}
            />
            )}
        </>
       }
    </div>
   
  )
}

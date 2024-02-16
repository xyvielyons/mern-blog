import React, { useEffect,useState } from 'react'
import authFetch from "./../axios/custom.js"
import moment from "moment"
import {FaThumbsUp} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'


export default function Comment({comment,onLike,onEdit,onDelete}) {
const [user,setUser] = useState({});
const [editedContent,setEditedContent] = useState(comment.content)
const [isEditing,setIsEditing] = useState(false)
const {currentUser} = useSelector((state) => state.user)
console.log(user)

    useEffect(()=>{
        const getUser = async ()=>{
            try {
                const res = await authFetch.get(`/user/getuser/${comment.userId}`)
                if(res.data.status == "success"){
                    setUser(res.data.user)
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        getUser();
    },[comment])

    const handleLike = async()=>{
        await onLike(comment._id)

    }


    const handleEdit = ()=>{
        setIsEditing(true)
        setEditedContent(comment.content)

    }

    const handleSave = async () =>{
        try {
            const res = await authFetch.put(`/comment/editComment/${comment._id}`,{
                content:editedContent
            })
            if(res.data.status == "success"){
                setIsEditing(false);
                onEdit(comment,editedContent)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    
  return (
    <div className='flex p-4 border-b dark: border-gray-200 text-sm'>
        <div className='flex-shrink-0 mr-3'>
            <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username}></img>

        </div>
        <div className='flex-1'>
            <div className="flex items-center mb-1">
                <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}`:`anonymous user`}</span>
                <span className="text-gray-500 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>
            </div>

            {isEditing ? (
                <>
                <Textarea className='mb-2'
                value={editedContent}
                onChange={(e)=>setEditedContent(e.target.value)}
                />
                <div className="flex justify-end gap-2 text-xs">
                    <Button type='button' size='sm' gradientDuoTone='purpleToBlue'
                    onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline 
                    onClick={(e)=> setIsEditing(false)}
                    >
                        Cancel
                    </Button>
                </div>
                </>
                
            ):(
                <>
                <p className='text-gray-500 pb-2'>{comment.content}</p>
                <div className='flex item-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button type="button" onClick={handleLike} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                <FaThumbsUp className='text-sm'/>
              </button>
              <p className='text-gray-400'>
                {
                    comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like':"likes")
                }
              </p>
              {
                
                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin)&& (
                    <>
                     <button onClick={handleEdit} type="button" className='text-gray-400 hover:text-blue-500'>
                    Edit
                    </button>
                    <button onClick={()=>onDelete(comment._id)} type="button" className='text-red-400 hover:text-blue-500'>
                    Delete
                    </button>
                    </>
                   
                )
              }
            </div>

                
                </>
            )}
            
        </div>
    </div>
  )
}

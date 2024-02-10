/* eslint-disable react/jsx-key */
import React, { useEffect,useState } from 'react'
import authFetch from "./../axios/custom.js"
import {useSelector} from "react-redux"
import {Table, TableCell} from "flowbite-react"
import {Link} from "react-router-dom"
export const DashPosts = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const [userPosts,setUserPosts] = useState([])
  console.log(userPosts);
  useEffect(()=>{
     const fetchPosts = async ()=>{
      try{
        const res = await authFetch.get(`/post/getPosts?userId=${currentUser._id}`)
        if(res.data.status == "success"){
          setUserPosts(res.data.posts)
        }

      }catch(err){
        console.log(err)

      }
     }
if(currentUser.isAdmin){
  fetchPosts()
}

  },[currentUser._id])
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 dark:scrollbar-track-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? 
      <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Data updated</Table.HeadCell>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>

        </Table.Head>
        
        {userPosts.map((post)=>
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                      src={post.image}
                      alt={post.title}
                      className='w-20 h-10 object-cover bg-gray-500 font-medium text-gray-900 dark:text-white '
                      ></img>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>

                  </Table.Cell>
                  <Table.Cell>
                  <Link to={`/post/${post.slug}`}>{post.category}</Link>
                     
                  </Table.Cell>
                  <Table.Cell>
                      <span className='font-medium text-red-500 cursor-pointer hover:undeline'>delete</span>
                     
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}> <span>edit</span></Link>
                 
                     
                  </Table.Cell>

              </Table.Row>
              
            </Table.Body>

          )
        }


      </Table>
      
      </>
      :
      <p>You have no posts yet</p>}
    </div>
  )
}

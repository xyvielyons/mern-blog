import React, { useState,useEffect } from 'react'
import { Button, Select, TextInput } from 'flowbite-react'
import {useLocation,useNavigate} from 'react-router-dom'
import authFetch from '../axios/custom'
import {PostCard} from "./../components/PostCard"
export default function Search() {
  const [sidebarData,setSidebarData] = useState({
    searchTerm:'',
    sort:'desc',
    category:'uncategorized'
  })
  const navigate = useNavigate();

  const [posts,setPosts] = useState([])
  const [loading,setLoading]=useState(false)
  const [showMore,setShowMore] = useState(false)
  const location = useLocation();

useEffect(()=>{
const urlParams = new URLSearchParams(location.search)
const searchTermFromUrl = urlParams.get('searchTerm')
const sortFromUrl = urlParams.get('sort')
const categoryFromUrl = urlParams.get('category')

if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
  setSidebarData({
    ...sidebarData,
    searchTerm:searchTermFromUrl,
    sort:sortFromUrl,
    category:categoryFromUrl

  })
}

const fetchPosts = async ()=>{
  
  try {
    setLoading(true)
  const searchQuery = urlParams.toString();
  console.log(searchQuery)
  const res = await authFetch(`/post/getPosts?${searchQuery}`)
  if(res.data.status === "success"){
    setPosts(res.data.posts)
    setLoading(false)
    if(res.data.posts === 9){
      setShowMore(true)
    }else{
      setShowMore(false)
    }

  }
    
  } catch (error) {
    console.log(error)
  }

}
fetchPosts()


},[location.search])
console.log(sidebarData)

const handleChange = (e)=>{
if(e.target.id === 'searchTerm'){
  setSidebarData({...sidebarData,searchTerm:e.target.value})
}
if(e.target.id === 'sort'){
  const order = e.target.value || 'desc';
  setSidebarData({...sidebarData,sort:order})

}
if(e.target.id === 'category'){
  const category = e.target.value || 'uncategorized'
  setSidebarData({...sidebarData,category})
}
}
const handleSubmit = (e)=>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search)
urlParams.set('searchTerm',sidebarData.searchTerm)
urlParams.set('sort',sidebarData.sort)
urlParams.set('category',sidebarData.category)
const searchQuery = urlParams.toString();
navigate(`/search?${searchQuery}`)

}
const handleShowMore = async ()=>{
  const numberOfPosts = posts.length
  const startIndex = numberOfPosts
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('startIndex',startIndex)
  const searchQuery = urlParams.toString()
  const res = await authFetch(`/post/getPosts?${searchQuery}`)
  if(res.data.status === "success"){
    if(res.data.posts.length === 9){
      setShowMore(true)
    }else{
      setShowMore(false)
    }
  }
 
}
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form action="" className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="">Search Term:</label>
            <TextInput placeholder='search...'
            id='searchTerm'
            type='text'
            value={sidebarData.searchTerm}
            onChange={handleChange}
            ></TextInput>
          </div>
          
          <div className="flex items-center gap-2">
            <label className='font-semibold'>sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value="desc">latest</option>
              <option value="asc">oldest</option>

            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className='font-semibold'>category:</label>
            <Select onChange={handleChange} value={sidebarData.category} id='category'>
              <option value="uncategorized">uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>

            </Select>
            <Button type='submit' outline gradientDuoTone="purpleToPink">
              Apply filtes

            </Button>
          </div>
        </form>
      </div>

      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
          {
            !loading && posts.length === 0 && <p className='text-xl text-gray-500'>
              No posts found
            </p>
          }
          {
            loading && 
            <p>loading....</p>
          }
          {
            !loading && posts && posts.map((post)=>
            <PostCard key={post._id} post={post}></PostCard>

          )}
          {
            showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7'>show more</button>
          }

        </div>

      </div>
    </div>
  )
}

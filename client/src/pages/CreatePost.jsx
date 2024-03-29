import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {app} from "./../firebase/firebase.js"
import {TextInput,Select, FileInput,Button, Alert} from "flowbite-react"
import authFetch from "./../axios/custom.js"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'


export const CreatePost = () => {
  const navigate = useNavigate();
  const [file,setFile] = useState(null)
  const [imageUploadProgress,setImageUploadProgress] = useState(null)
  const [imageUploadError,setImageUploadError] = useState(null)
const [formData,setFormData] = useState({})
const [publishError,setPublishError] = useState(null)





  const handleUploadImage = async()=>{
     try {
      if(!file){
        setImageUploadError("please select an image")
        return;
      }
      setImageUploadError(null)
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name
      const storageRef = ref(storage,fileName);

      const uploadTask = uploadBytesResumable(storageRef,file)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageUploadProgress(progress.toFixed(0))
        },(error)=>{
      setImageUploadError("image upload failed")
      setImageUploadProgress(null)
      console.log(error)
      
     },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageUploadError(null)
        setImageUploadProgress(null)
        setFormData({...formData,image:downloadURL})
      })
     }

      )


    }catch(err){
      setImageUploadError("image upload failed")
      setImageUploadProgress(null)
      console.log(err)
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    setPublishError(null)
    try{
      const res = await authFetch.post('/post/create',formData)
      if(res.data.status == "success"){
        navigate(`/post/${res.data.message.slug}`)
      }
    }catch(err){
      setPublishError(`something went wrong ${err}`)
      console.log(err)

    }

  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Create a post

      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type="text" placeholder="Title" required id="title" className='flex-1' onChange={(e)=>{
            setFormData({...formData,title:e.target.value})
          }}></TextInput>
          <Select
          onChange={(e)=>{
            setFormData({...formData,category:e.target.value})
          }}
          >

            <option value="uncategorized">select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>


          </Select>

        </div>

        <div className='flex gap 4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
           <FileInput type="file" accept='image/*'onChange={(e)=>setFile(e.target.files[0])}/>
           <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage} disabled={imageUploadProgress}>{
          imageUploadProgress ? 
          <div className="w-16 h-16">
            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
          </div>
        :"upload image"}</Button>
        </div>
        {imageUploadError && 
        <Alert color="failure">{imageUploadError}</Alert>}
        {
          formData.image && <img
          src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
          ></img>
        }
        
        <ReactQuill theme="snow" placeholder='write something...' className='h-72 mb-12'required
        onChange={
          (value)=>{
            setFormData({...formData,content:value});
          }
        }></ReactQuill>

        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
        {
          publishError && <Alert className="mt-5" color='failure'>
           {publishError}
          </Alert>
        }
      </form>
      

    </div>
  )
}

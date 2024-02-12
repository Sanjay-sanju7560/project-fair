import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import uploadeProfile from '../assets/Images/uploadPic.png'
import { SERVER_URL } from '../Services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileAPI } from '../Services/allAPIs';



function Profile() {
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState({
    username:"",password:"",email:"",github:"",linkedIn:"",profileImage:""
  })
const [existingImage,setExistingImage] = useState("")
const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("userDetails")){
     const userDetails =   JSON.parse(sessionStorage.getItem("userDetails"))
    setUserData({...userData,username:userDetails.username,password:userDetails.password,email:userDetails.email,github:userDetails.github,linkedIn:userDetails.linkedIn,})
    setExistingImage(userDetails.Profile)
  }
},[open])

useEffect(()=>{
  if(userData.profileImage){
    setPreview(URL.createObjectURL(userData.profileImage))
  }else{
    setPreview("")
  }
})
// console.log(userData);
const handleProfileUpdate = async()=>{
  const { username,password,email,github,linkedIn,profileImage} =userData
  if(!github || !linkedIn){
    toast.info("please fill the form completly !!")
  }else{
    // proceed to call api
    const reqBody = new FormData()
    reqBody.append("username",username)
    reqBody.append("password",password)
    reqBody.append("email",email)
    reqBody.append("github",github)
    reqBody.append("linkedIn",linkedIn)
    preview?reqBody.append("profileImage",profileImage):reqBody.append("existingImage",existingImage)

    const token = sessionStorage.getItem("token")
    if(token ){
      const reqHeader = {
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
      }
      //api call
      try{
        const result = await updateUserProfileAPI(reqBody,reqHeader)
        if(result.statu==200){
          setOpen(!open)
          sessionStorage.setItem("userDetails",JSON.stringify(result.data))
        }else{
          console.log(result);
        }
      }catch(err){
        console.log(err);
      }
    }
  }
}
  return (
    <>
    <div className="d-flex rounded p-2 justify-content-between">
      <h3>Profile</h3>
      <button onClick={()=>setOpen(!open)}className='btn btn-outline-warning shadow'><i className="fa-solid fa-chevron-down "></i></button>
    </div>
    <Collapse in={open}>
        <div className= 'shadow p-5 justify-content-center mt-3' id="example-collapse-text">
          <label className='text-center'>
           <input style={{display:'none'}} type="file" onChange={e=>setUserData({...userData,profileImage:e.target.files[0]})}/>
              { existingImage == ""? <img className='rounded-circle'  width={'200px'} height={"200px"} src={preview?preview:uploadeProfile} alt="uploaded image" />
              :  <img className='rounded-circle'  width={'200px'} height={"200px"} src={preview?preview:`${SERVER_URL}/uploads/${existingImage}`} alt="uploaded image" />
              }         
          </label>
            <input placeholder='Enter your Github URL' type="text" className='form-control mt-3' value={userData.github} onChange={e=>setUserData({...userData,github:e.target.value})}/>
            <input placeholder='Enter your Linkidin URL' type="text" className='form-control mt-3' value={userData.linkedIn}  onChange={e=>setUserData({...userData,linkedIn:e.target.value})}/>
            {/* <hr/> */}
            <button className='btn btn-rounded shadow' onClick={handleProfileUpdate} style={{backgroundColor:'lightgreen'}}>Update</button>
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme="colored" position="top-center"/>

    </>
  )
}

export default Profile
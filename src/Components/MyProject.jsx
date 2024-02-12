import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProjects'
import EditProject from './EditProjects'
import { deleteProjectsAPI, getUserProjectsAPI } from '../Services/allAPIs'
// import Project from '../Pages/Project'
import { addProjectResponseContext } from '../ContextAPI/ContextShare'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProject() {

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(addProjectResponseContext)

  const [allProjects,setAllProjects]=useState([])

  const getUserProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getUserProjectsAPI(reqHeader)
      if (result.status===200) {
        setAllProjects(result.data)
      }else{
        console.log(result)
      }
  }
}
useEffect(()=>{
  // console.log("Inside MyProject UseEffect");
  getUserProjects()
},[addProjectResponse,editProjectResponse])
console.log(allProjects);
const handleDeleteProject = async (pid)=>{
  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader ={
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }

  try{
    const result = await deleteProjectsAPI(pid,reqHeader)
    if(result==200){
      getUserProjects()
    }else{
      toast.warning(result.response.data)
    }
  }catch(err){
    console.log(err);
  }
}
}
  return (
   <>
   <div className="card shadow p-3">
    <div className="d-flex justify-content-between">
    <h2>My Projects</h2>
    <div><AddProject/></div>
    </div>
   </div>
   <div className="mt-4">
    {allProjects.length>0? allProjects.map((project,index)=>(
      <div key={index} className='border rounded d-flex justify-content-between align-items-center text-danger mb-3 p-2'>
      <h5>{project?.title}</h5>
      <div className='d-flex icons'>
        <EditProject project={project}/>
        <a target='_blank' className='btn' href={project?.github}> <i style={{height:'34px'}} className='fa-brands fa-github fa-2x'></i></a>
        <button className='btn '  onClick={handleDeleteProject}>  <i style={{height:'34px'}} className='fa-solid fa-trash fa-2x' ></i></button>
         </div>
    </div>
    )) :
     <div className='text-danger fs-4 fw-bolder'>No projects are uploaded yet !!!</div>
    }
    <ToastContainer autoClose={2000} theme="colored" position="top-center"/>

   </div>
   
   </>
  )
}

export default MyProject
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import {SERVER_URL} from '../Services/serverUrl'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectsAPI } from '../Services/allAPIs';

function EditProject({project}) {
  console.log(project);
  const [projectData, setProjectData] = useState({
  id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""//project.projectImage
})

const [preview,setPreview] = useState("")
const [show, setShow] = useState(false);

useEffect(()=>{
  if(projectData.projectImage){
    setPreview(URL.createObjectURL(projectData.projectImage))
  }else{
    setPreview("")
  }
},[projectData.projectImage])

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      id:project._id,title:project.title,language:project.language,overview:project.overview,github:project.github,website:project.website,projectImage:""//project.projectImage
    })
    setPreview("")
  }
const handleUpdate = async () =>{
  const {id,title,language,overview,github,website,projectImage} = projectData 
  if(!title || !language || !overview || !github || !website ){
    toast.info("please fill the form completly !!")
  }else{
    const reqBody = new FormData()
    reqBody.append("title",title),
    reqBody.append("language",language),   
    reqBody.append("overview",overview),   
    reqBody.append("github",github),
    reqBody.append("website",website),    
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
    // api call reqHeader
    const token = sessionStorage.getItem("token")
console.log(token);
if(token){
    const reqHeader = {
      "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
    }
    //API call
    try{
      const result = await editProjectsAPI(id,reqBody,reqHeader)
      console.log(result);
      if(result.status==200){
        toast.warning(`project  updated Successfully..`)
        handleClose()
      }else{
        toast.warning(result.response.data)
      }
    }catch(err){
      console.log(err);
   }
  }
} 
  }


  return (
   <>
   <button  onClick={handleShow} className='btn '><i f className='fa-solid fa-edit fa-2x'></i> </button>
    <Modal size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row'>
          <div className='col-lg-6'>
            <label >
              <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.value})}/>
              <img style={{height:'250px'}} className='w-100' src={preview?preview:`${SERVER_URL}/uploads/${project.projectImage}`} alt="upload project image" />
            </label>
          </div>

          <div className='col-lg-6'>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Title' value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Language Used'  value={projectData.language} onChange={e=>setProjectData({...projectData,language:e.target.value})}/>
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Github Link'  value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Website Link'  value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project OverView'  value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center"/>
    </>
  )
}

export default EditProject
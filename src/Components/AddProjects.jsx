import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadProject from '../assets/Images/UP.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPIs';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';

function AddProject() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const [fileStatus,setfileStatus] = useState(false);
  const [preview,setPreview] = useState("");
  const [show, setShow] = useState(false);
  const [projectData, setProjectData] = useState({
    tittle:"",language:"",overview:"",github:"",website:"",projectImage:""
  });
  console.log(projectData);

  const handleClose = () => {
    setShow(false)
    setProjectData({
      tittle:"",language:"",overview:"",github:"",website:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  useEffect(()=>{
    console.log(projectData.projectImage.type);
if(projectData.projectImage.type =="image/png" || projectData.projectImage.type =="image/jpg" || projectData.projectImage.type =="image/jpeg" ){
  // console.log("Generate img url");
  setPreview(URL.createObjectURL(projectData.projectImage))
  setfileStatus(false)
}else{
  // console.log("*Please Upload file with following Extentsions (png, jpg,jpeg) Only*");
  setfileStatus(true)
  setPreview("")
setProjectData({...projectData,projectImage:""})
}
  },[projectData.projectImage])

const handleAddProject = async ()=>{
  const  {tittle,language,overview,github,website,projectImage} = projectData
  if(!tittle || !language || !overview || !github || !website || !projectImage ){
    toast.info("Please fill the form completly !!! ")
  }else{
    //api call - reqBody
    const reqBody = new FormData()
    reqBody.append("title",tittle)
    reqBody.append("language",language)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImage",projectImage)
    const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
   try{ const result = await addProjectAPI(reqBody,reqHeader)
    console.log(result);
    if(result.status===200){
      console.log(result.data);
      handleClose()
      setAddProjectResponse(result.data)
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
    <button onClick={handleShow} className='btn '><i className='fa-solid fa-upload'></i> AddProject</button>
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
              <input type="file" style={{display:'none'}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
              <img style={{height:'200px'}} className='w-100' src={preview?preview:uploadProject} alt="upload project image" />
            </label>
          </div>
          {fileStatus&&<div className="text-danger mt-2"> *Please Upload file with following Extentsions (png, jpg,jpeg) Only* </div>}

          <div className='col-lg-6'>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Title' value={projectData.tittle}
               onChange={e=>setProjectData({...projectData,tittle:e.target.value})} />
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Language Used' value={projectData.language}
               onChange={e=>setProjectData({...projectData,language:e.target.value})} />
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Github Link'  value={projectData.github}
               onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project Website Link' value={projectData.website}
               onChange={e=>setProjectData({...projectData,website:e.target.value})} />
            </div>

            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Project OverView' value={projectData.overview}
               onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center"/>
    </>
  )
}


export default AddProject
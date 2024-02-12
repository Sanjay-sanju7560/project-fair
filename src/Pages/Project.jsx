import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { getAllProjectsAPI } from '../Services/allAPIs'

function Project() {
  const [searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects]=useState([])
  const getAllProjects = async ()=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await getAllProjectsAPI(searchKey,reqHeader)
      if (result.status===200) {
        setAllProjects(result.data)
      }else{
        console.log(result)
      }
  }
}
console.log(allProjects);

useEffect(()=>{
  getAllProjects()
},[searchKey])
  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }} className='Peoject-page-design'>
      <div className='d-flex justify-content-between m-5'>
        <h1>All Projects</h1>
        <input onChange={e=>setSearchKey(e.target.value)} style={{ width: '300px' }} className='border border-2 dark rounded ' type="text" placeholder='Search By language used' />
      </div>
        <Row className='mt-5 container-fluid'>
       { allProjects?.length>0? allProjects.map((project,index)=>(
         <Col key={index} sm={12} md={6} lg={4}>
         <ProjectCard project={project}/>
       </Col>
       )) :
       <div className='text-danger fs-4 fw-bolder'>Nothing To Display</div>
       }
         </Row>
      </div>
    </>
  )
}

export default Project
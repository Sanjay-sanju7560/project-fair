import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../Services/allAPIs';


function Home() {

  const navigate = useNavigate()
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [allProjects,setAllProjects] = useState([])
console.log(allProjects);
  const getHomeProject = async () => {
    const result = await getHomeProjectsAPI()
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      console.log(result);
    }
  }


  useEffect(() =>{ 
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])
  const handleProjectPage = () => {
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning("Please login to explore our Projects !!!")
    }
  }
  return (
    <>
      {/* landing page */}
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#90ee90' }} className='rounded d-flex align-items-center'>
        <div style={{ height: '100%' }} className="container">
          <div style={{ height: '100%' }} className='row align-items-center'>
            <div className="col-lg-5">
              <h1 style={{ fontSize: '50px' }} className='fw-bolder text-light'> <i style={{ height: '82px' }} class="fa-solid fa-paperclip"></i> Project Fair</h1>
              <p>my projects reflect a deep understanding of the latest web technologies. The coding languages and frameworks employed in these creations span the spectrum,
                from the versatility of HTML, CSS, and JavaScript to the robustness of popular frameworks like React and Node.js. Through meticulous design and development,
                I have crafted a collection of web solutions that not only meet industry standards but also push the boundaries of innovation. This project fair is a celebration
                of my journey in web development, encapsulating the diverse skills and experiences that contribute to my proficiency in this dynamic field."</p>
              { isLoggedIn ? <Link className='btn btn-warning' to={'/dashboard'}>Manage your Projects<i class="fa-solid fa-arrow-right ms-2"></i>
              </Link>:<Link className='btn btn-warning' to={'/login'}>Starts to Explore<i class="fa-solid fa-arrow-right ms-2"></i> </Link>}     
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4">
             <img className='img-fluid mt-5 py-1' style={{ height: '400px', width: '400px', borderRadius: '170px' }} src="https://previews.123rf.com/images/luplupme/luplupme2006/luplupme200600253/149528299-language-education-conversation-vector-illustration-people-man-woman-character-english-communication.jpg" alt="" />
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
      <div className='Projects mt-5'>
        <h1 className='text-center  mb-5'>Explore Our Projects</h1>
        <marquee >
        <div className='d-flex justify-content-between'>

       {allProjects.length>0? allProjects.map((project,index)=>(
         <div key={index}className='me-5'>
         <ProjectCard project={project}/>
       </div>
       )): null}

        </div>
        </marquee>
        <div className='text-center'>
        <button onClick={handleProjectPage} className='btn btn-link'>View More Projects</button>
        </div>
        <ToastContainer autoClose={2000} theme="colored" position="top-center"/>
      </div>
    </>
  )
}

export default Home
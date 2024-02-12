import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import tokenAuthentication from '../ContextAPI/tokenAuthentication'


function Header({insideDashboard}) {
  // const {isAutherised,setIsAutherised} =useContext(tokenAuthentication)--------------------------------------X

  const navigate = useNavigate()

  const handleLogout = ()=>{
   sessionStorage.removeItem("token")
   sessionStorage.removeItem("username")
   navigate('/')
  //  setIsAutherised(false)------------------------------------------------------------------------------------X
  }
  return (
    <>
     <Navbar style={{backgroundColor:'GrayText'}}>
        <Container>
          <Navbar.Brand className='text-light fw-bolder fs-4'>
         <Link to={'/'} className='text-light' style={{textDecoration:'none'}} > <i style={{height:'26PX'}}
         className='fa-solid fa-paperclip'></i> <span>Project Fair</span></Link>
            
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className='ms-auto'>
              <button onClick={handleLogout} className='btn text-dark '> <i className=' fa-solid fa-gear'></i>LogOut</button>

            </div>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header
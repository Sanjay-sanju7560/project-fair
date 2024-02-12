import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import { loginAPI, registerAPI } from "../Services/allAPIs";
 import Spinner from 'react-bootstrap/Spinner';
//  import tokenAuthentication from '../ContextAPI/tokenAuthentication'----------------------------------------------------X


function Auth({ insideRegister }) {
  // const {isAutherised,setIsAutherised} =useContext(tokenAuthentication)---------------------------------------------------X
  const [loginStatus,setLoginStatus]=useState(false)
  const navigate =useNavigate()
  const [userData,setUserData] = useState({
           username:"",email:"",password:""

  })
  const handleRegister = async (e)=>{
    e.preventDefault()
    console.log(userData);
    const {username,email,password} = userData
    if(!username || !email || !password){
      toast.info('Please fill the form completly!!')
    }else{
      // toast.succes('Proceed to call api ')
      try{
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status === 200){
          toast.success(`${result.data.username} has registered successfully !!!`)
          setUserData({username:"",email:"",password:""})
          setTimeout(() => {
            navigate('/login')
          }, 3000);
        }
        else{
         toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
      }
    }
  }
  const handleLogin = async (e)=>{
    e.preventDefault()
    console.log(userData);
    const {email,password} = userData
    if(!email || !password){
      toast.info('Please fill the form completly!!')
    }
  
  else{
    // toast.succes('Proceed to call api ')
    try{
      const result = await loginAPI({email,password})
      console.log(result);
      if(result.status === 200){
        setLoginStatus(true)
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("userDetails",JSON.stringify(result.data.existingUser))
        // setIsAutherised() ------------------------------------------------------------------------------------------------------------------X
        setUserData({email:"",password:""})
        setTimeout(() => {
          navigate('/')
          setLoginStatus(false)
        }, 2000);
      }
      else{
       toast.warning(result.response.data)
      }
    }catch(err){
      console.log(err);
    }
  }}

  return (
    <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      <div className='container w-75'>
        <Link to={'/'}> <i className='fa-solid fa-arrow-left me-1 fw-bolder'>Back To Home</i> </Link>
        <div className='card shadow p-5 bg-info'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='w-100' src="https://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png" alt="login" />
            </div>
            <div className='col-lg-6'>
              <div className='d-flex align-items-center flex-column'>
                <h1 style={{ fontSize: '50px' }} className='fw-bolder text-light'> <i style={{ height: '82px' }}
                  class="fa-solid fa-paperclip"></i> Project Fair</h1>
                <h5 className='fw-bolder mt-2 pb-3 text-light'>
                  {insideRegister ? 'Sign up your account' : 'Sign In to your Account'}
                </h5>
                <Form className='w-100 ' >
                  {insideRegister && (
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control type="text" placeholder="Enter Username"
                       onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter email"
                      onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password"
                      onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} />
                  </Form.Group>
                  { insideRegister ?
                      <div>
                        <button className='btn btn-light' onClick={handleRegister}>Register</button>
                        <p>Already have a Account?Click here to <Link to={'/login'} className='text-light' >Login  
                       
                        </Link> 
                        </p>
                      </div> :
                      <div>
                        <button onClick={handleLogin} className='btn btn-light mb-2' >Login 
                        {loginStatus&&  <Spinner animation="border" role="status">
                         <span className="visually-hidden">Loading...</span>
                         </Spinner> }
                        </button>
                        <p>New User?Click here to <Link to={'/register'} className='text-light' >Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center"/>
    </div>
  )
}

export default Auth
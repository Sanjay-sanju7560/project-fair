import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthenticationContext = createContext()

function tokenAuthentication(children) {
   
    const {isAutherised,setIsAutherised}= useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAutherised(true)
        }else{
            setIsAutherised(false)
        }
    }),[isAutherised]

  return (
    <>
    <tokenAuthenticationContext.Provider value={{isAutherised,setIsAutherised}}>
        {children}
        </tokenAuthenticationContext.Provider>
    </>
  )
}

export default tokenAuthentication
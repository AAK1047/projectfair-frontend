import React, { createContext, useState } from 'react'

export const addresponsecontext=createContext({})
export const editresponsecontext=createContext({})
export const loginresponsecontext=createContext({})

function Contextshare({children}) {
    const [addresponse ,setaddresponse]=useState()
    const [editresponse , seteditresponse]=useState()
    const[loginresponse , setloginresponse]=useState()


  return (
    <>
       <addresponsecontext.Provider value={{addresponse,setaddresponse}}>
        <editresponsecontext.Provider value={{editresponse,seteditresponse}}>
       <loginresponsecontext.Provider value={{loginresponse,setloginresponse}}>
  
          {children}
          
       </loginresponsecontext.Provider>
        </editresponsecontext.Provider>
       
       </addresponsecontext.Provider>
    </>
  )
}

export default Contextshare
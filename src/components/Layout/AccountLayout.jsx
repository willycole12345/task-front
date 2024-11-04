import React,{ useState, PropsWithChildren} from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const AcountLayout = ({ children }) => {
    
    return (
        <div >
            
            <Navbar/>
            <Sidebar />   
            {children}
        </div>
       
  )
}

export default AcountLayout;
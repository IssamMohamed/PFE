import React from 'react'
import { useParams } from 'react-router-dom';
import SideBar from './component/SideBar'

import NavBarE from './component/NavBarE';

function Employer() {
  const { id } = useParams(); 
  return (
    <div>
        <SideBar id_E={id} />
        <NavBarE id={id} />
    </div>
  )
}

export default Employer
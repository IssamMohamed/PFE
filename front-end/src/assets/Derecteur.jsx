import React from 'react'
import { useParams } from 'react-router-dom';
import SideBar from './component/SideBar'

import NavBarD from './component/NavBarD';

function Derecteur() {
  const { id } = useParams(); // Extract the id parameter f
  return (
    <div>
        <SideBar id_E={id} />
        <NavBarD id={id} />
    </div>
  )
}

export default Derecteur
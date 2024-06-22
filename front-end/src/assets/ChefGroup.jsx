import React from 'react'
import { useParams } from 'react-router-dom';
import SideBar from './component/SideBar'
import NavBar from './component/NavBar'

function ChefGroup() {
  const { id } = useParams(); // Extract the id parameter f
  return (
    <div>
        <SideBar id_E={id} />
        <NavBar id={id}/>
    </div>
  )
}

export default ChefGroup
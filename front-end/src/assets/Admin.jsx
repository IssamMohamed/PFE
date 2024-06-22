import React from 'react'
import { useParams } from 'react-router-dom';
import SideBar from './component/SideBar'
import AdmineHero from './component/AdmineHero';

function Admin() {
    const { id } = useParams();
    
  return (
    <div>
        <SideBar id_E={id}/>
        <AdmineHero id={id}/>
    </div>
  )
}

export default Admin
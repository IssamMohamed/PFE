import React, { useState } from 'react'
import Icon from '@mdi/react';
import { mdiAccountMultiple } from '@mdi/js';
import { mdiBell } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { mdiAccountCircle } from '@mdi/js';
import Style from './Styles/SideBar.module.css'
import Groups from './Groups';
import ViewNot from './ViewNot';
import Account from './Account';
import { Link } from 'react-router-dom';


function SideBar({id_E}) {
   const [groups, setGroups] = useState(false);
   const [notification, setNotification] = useState(false);
   const [account, setAccount] = useState(false);

  return (
    
    
      <div className={Style.container}>
      <div className={Style.first}><button className={Style.button} onClick={()=>setAccount(true)}><Icon path={mdiAccountCircle} size={1} color="rgb(161, 173, 173)"/></button></div>
      <div className={Style.second}>
      <button className={Style.button} onClick={()=>setGroups(true)}><Icon path={mdiAccountMultiple} size={1} color="rgb(161, 173, 173)"/></button>
      <button className={Style.button} onClick={()=>setNotification(true)}><Icon path={mdiBell} size={1} color="rgb(161, 173, 173)"/></button>
      </div>
      <div className={Style.last}>
      <Link to="/"><button className={Style.button}><Icon path={mdiLogout} size={1} color="rgb(161, 173, 173)"/></button></Link>
      </div>
      {groups ? <Groups id={id_E} onClose={()=>setGroups(false)}/>:null}
      {notification ? <ViewNot id_E={id_E}  onClose={()=>setNotification(false)}/>:null}
      {account ? <Account id={id_E} onClose={()=>setAccount(false)}/>:null}
    </div>
    
    )
   
}

export default SideBar
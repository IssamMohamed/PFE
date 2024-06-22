import React, { useState, useEffect } from 'react';
import Style from './Styles/CreatUser.module.css'
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';
function Modifier({onClose,user}) {
    const [password, setPassword]=useState(user.password);
    const [name, setName]=useState(user.name);
    const [id, setId]=useState(user.id);
    const [role, setRole]=useState(user.role);
    const [sex, setSex]=useState(user.sex);  
    const [group, setGroup]=useState(user.id_group); 

    console.log(password);
    console.log(name);
    console.log(id);
    console.log(role);
    console.log(sex);
    console.log(group);
    const handleSubmission = async () => {
        try {
            const response = await fetch('http://localhost/back_endgenerale/Modifier.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    password,
                    role,
                    sex,
                    group,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result);
            // Handle successful submission here (e.g., show a success message)
        } catch (error) {
            console.error('There was a problem with your submission:', error);
            // Handle errors here (e.g., show an error message)
        }
        onClose();
    };
    


  return (
    <div className={Style.MainContaner}> 
        <div className={Style.mainContaner}>
           <label for="id">Id: {id}</label>
            
            <label for="password">Password:</label>
            <input  className={Style.inpt} type="text"  value={password} name='password' id='password' onChange={(e)=>setPassword(e.target.value)}/>
            <label for="name">Full Name:</label>
            <input className={Style.inpt} type="text"  value={name} name='name' id='name' onChange={(e)=>setName(e.target.value)}/>
            <form>
            <label for="users">Choose a Role:</label>
            <select name="users" id="users"  onChange={(e) => setRole(e.target.value)}>
                <option value="Employee">Employer</option>
                <option value="Chef">ChefGroup</option>
                <option value="Director">Derecteur</option>
                <option value="Admine">Admin</option>
            </select>
            </form>
            
            <form>
            <label for="sex">Choose a Gender:</label>
            <select name="sex" id="sex"  onChange={(e) => setSex(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
            </select>
            </form>
            <form>
            <label for="group" >Choose a Group:</label>
            <select name="group" id="group" onChange={(e) => setGroup(e.target.value)}>
                <option value="1">HelpDesk, Internet et Intranet</option>
                <option value="2">Réseaux</option>
                <option value="3">Support Métier</option>
                <option value="4">Systèmes</option>
            </select>
            </form>
            <button className={Style.submitButton} onClick={handleSubmission}>Submit</button>

            <button className={Style.quite} onClick={onClose}><Icon path={mdiCloseOutline} size={1} /></button>
        </div>
    </div>
  )
}

export default Modifier
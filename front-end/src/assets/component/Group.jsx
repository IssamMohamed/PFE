import React, { useState, useEffect } from 'react';

import Style from './Styles/Group.module.css';
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';
import { mdiSendVariantOutline } from '@mdi/js';
import Notification from './Notification';

function Group({ id_group,id, onClose }) {
    const [note, setNote] = useState(false);
    const [idto, setIdto] = useState('');
    const [employees, setEmployees] = useState([]); // Initialize employees state
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost/back_endgenerale/GroupEmployee.php', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_group }),
              });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setEmployees(data.filter(u => u.id_E!== id)); // Update employees state with fetched data
            console.log(data);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
    
        fetchData();
      }, [id_group]); // Add id_group to the dependencies array to re-fetch data when it changes

    return (
        <div className={Style.containerG}>
            <button className={Style.buttonXE} onClick={onClose}><Icon path={mdiCloseOutline} size={1} /></button>
            <div className={Style.containerGm}>
                {employees.map((employee) => (
                    <div key={employee.id_E} className={Style.buttonG}>
                        <h1>{employee.name}</h1> 
                        <button onClick={()=>{setNote(true);setIdto(employee.id_E)}}>
                            <Icon path={mdiSendVariantOutline} size={1} />
                        </button>
                    </div>
                ))}
                {note ? <Notification id_from={id} id_to={idto} onClose={()=>setNote(false)}/> : null}
            </div>
        </div>
    );
}

export default Group;

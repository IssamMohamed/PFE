import React, { useEffect } from 'react'
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';
import Style from'./Styles/Message.module.css';


function Message({content,object,id_note,onClose}) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/back_endgenerale/VUnote.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_note }),
          });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEmployees(data); // Update employees state with fetched data
        console.log(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [id_note]);
  return (
    <div className={Style.con1}>
        <button className={Style.btnM} onClick={onClose}><Icon path={mdiCloseOutline} size={1} /></button>
        <div className={Style.con2}>
        <h1>{object}</h1>
            <h1>{content}</h1>
        </div>
    </div>
  )
}

export default Message
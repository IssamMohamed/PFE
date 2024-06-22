import React, { useState,useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiCloseOutline, mdiSendVariantOutline } from '@mdi/js'; 
import Style from './Styles/ViewNot.module.css';
import Message from './Message'; // Assuming Message is a custom component

function ViewNot({id_E, onClose }) {
   
    const [message, setMessage] = useState(false);
    const [content, setContent] = useState('');
    const [object, setObject] = useState('');
    const [id, setId] = useState('');
    const [notifications, setNotifications] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost/back_endgenerale/voirNote.php', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id_E}), // Make sure to replace 'your-password-here' with the actual password or variable containing the password
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setNotifications(data);
            console.log(data.sender); // Do something with the fetched data
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
        fetchData();
      }, []);
    

    return (
        <div className={Style.a}>
            <button  onClick={onClose} className={Style.btnX}><Icon path={mdiCloseOutline} size={1} /></button>
            <div  className={Style.b}>
                {notifications.map((note) => (
                    <button
                        key={note.id} // Assign unique key
                        className={Style.btn}
                        onClick={() => {
                            setMessage(true);
                            setContent(note.content);
                            setObject(note.object);
                            setId(note.id);
                        }}
                    >
                        {note.name}
                    </button>
                ))}
                {message ? <Message id_note={id} object={object} content={content} onClose={() => { setMessage(false); }} />:<h1></h1>}
            </div>
        </div>
    );
}

export default ViewNot;

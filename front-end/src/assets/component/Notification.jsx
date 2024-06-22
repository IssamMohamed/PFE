import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiCloseOutline, mdiSendVariantOutline } from '@mdi/js';
import Style from './Styles/Notification.module.css';

function Notification({ id_from, id_to, onClose }) {
  const [content, setContent] = useState('');
  const [object, setObject] = useState('');

  console.log(content + ' ' + id_from + ' ' + id_to + ' ');

  const handleOnChange = (event) => {
    setContent(event.target.value);
    console.log(event.target.value);
  };
  const handleObject = (event) => {
    setObject(event.target.value);
    console.log(event.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await fetch('http://localhost/back_endgenerale/sendNote.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_from, id_to, content, object }),
      });
      console.log({ id_from, id_to, content, object })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Handle the response data as needed
      setObject('');
      setContent('');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className={Style.Mc}>
      <div className={Style.mc}>
        <button className={Style.quit} onClick={onClose}>
          <Icon path={mdiCloseOutline} size={1} />
        </button>
        <input className={Style.object} type="text" placeholder='Object...' value={object}  onChange={handleObject}/>
        <textarea
          className={Style.text}
          rows={10}
          cols={100}
          placeholder="Type your message here..."
          onChange={handleOnChange}
          value={content} // Make sure the textarea value is controlled
        />
        <br />
        <button className={Style.send} onClick={handleSend}>
          <Icon path={mdiSendVariantOutline} size={1} color={"white"} />
        </button>
      </div>
    </div>
  );
}

export default Notification;

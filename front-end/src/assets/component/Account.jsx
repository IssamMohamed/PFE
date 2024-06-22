import React, { useEffect, useState } from 'react';
import Style from './Styles/Account.module.css';
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';

function Account({ id, onClose }) {
  const [modefiy, setModify] = useState(false);
  const [save, setSave] = useState(false);
  const [password, setPassword] = useState('');

  const handleOnChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
    console.log(password);
  };

  useEffect(() => {
    if (!save) return;

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/back_endgenerale/Modifpssword.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, password }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setSave(false); 
      }
    };

    fetchData();
    setModify(false); 
  }, [save, id, password]);

  return (
    <div className={Style.cMA}>
      <button className={Style.buttonXAccount} onClick={onClose}>
        <Icon path={mdiCloseOutline} size={1} />
      </button>
      <div className={Style.cmA}>
        <div className={Style.cGrid}>
          <h1 className={Style.h1Account}>id:</h1>
          <h1 className={Style.h1Account}>{id}</h1>
          <h1 className={Style.h1Account}>password:</h1>
          {modefiy ? (
            <div className={Style.h1Account}>
              <input
                onChange={handleOnChange}
                className={Style.inputAccount}
                type="text"
                placeholder="Type your password..."
                value={password}
              />
              <button
                className={Style.btnSaveAcount}
                onClick={() => setSave(true)}
              >
                Save
              </button>
            </div>
          ) : (
            <h1 className={Style.h1Account}>.............</h1> 
          )}
        </div>
        <button className={Style.btnAccount} onClick={() => setModify(true)}>
          Modify
        </button>
      </div>
    </div>
  );
}

export default Account;

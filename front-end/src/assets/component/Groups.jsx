import React, { useEffect, useState } from 'react';
import Style from './Styles/Groups.module.css';
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';
import Group from './Group';

function Groups({ id, onClose }) {
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(false);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/back_endgenerale/Group.php');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setGroups(data);
        console.log(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={Style.containerGs}>
      <button className={Style.buttonX} onClick={onClose}>
        <Icon path={mdiCloseOutline} size={1} />
      </button>
      <div className={Style.containerGsm}>
        {groups.map((group, index) => (
          <button
            key={index}
            className={Style.buttonGs}
            onClick={() => { setGroup(true); setGroupId(group.id); }}
          >
            {group.name}
          </button>
        ))}
        {group ? <Group id={id} id_group={groupId} onClose={() => { setGroup(false); setGroupId(null); }} /> : null}
      </div>
    </div>
  );
}

export default Groups;

import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiDeleteEmptyOutline } from '@mdi/js';
import { mdiFaceManProfile } from '@mdi/js';
import { mdiFaceWomanProfile } from '@mdi/js';
import Style from './Styles/AdmineHeron.module.css';
import CreatUser from './CreatUser';
import Modifier from './Modifier';

function AdmineHero({ id }) {
    const [list, setList] = useState([]);
    const [nom, setNom] = useState('');
    const [idu, setIdu] = useState('');
    const [group, setGroup] = useState('');
    const [role, setRole] = useState('');
    const [sex, setSex] = useState(null);
    const [creat, setCreat] = useState(false);
    const [render, setRender] = useState(false);
    const [modifier, setModifier] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {

        const fetchData = async () => {
            if (!id) return;

            try {
                const response = await fetch('http://localhost/back_endgenerale/ListUsers.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setList(data.filter(u => u.role!== 'Admine'));
                    console.log(data);
                } else {
                    alert('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [render]);

    function handelProfile(user) {
        setNom(user.name);
        setIdu(user.id);
        setRole(user.role);
        setSex(user.sex === 'Male'? <Icon path={mdiFaceManProfile} size={3} /> : <Icon path={mdiFaceWomanProfile} size={3} />);
        setUser(user);
        switch(user.id_group){
          case "1":
            setGroup('HelpDesk, Internet et Intranet');
            break;
          case "2":
            setGroup('Réseaux');
            break;
          case "3":
            setGroup('Support Métier');
            break;
          case "4":
            setGroup('Systèmes');
            break;
        }
    }

    const Delete = async (id) => {
        
        try {
            const response = await fetch('http://localhost/back_endgenerale/DeletUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
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
        setRender(!render);
    };

    return (
        <>
            {creat? <CreatUser onClose={() => { setCreat(false);setRender(!render); }} /> :<div>
                {modifier? <Modifier user={user} onClose={()=>{ setModifier(false);setRender(!render); }}/>:<div className={Style.A}>
                    <h1 className={Style.h1}>List users</h1>
                    {list.length > 0? list.map((user) => (
                        <div key={user.id} className={Style.B} onClick={() => { handelProfile(user); }}>
                            <h2 className={Style.h2}>{user.name}</h2>
                            
                            <button className={Style.btnA} onClick={() => Delete(user.id)}>
                                <Icon path={mdiDeleteEmptyOutline} size={1.3} color={"#a7a8a8"} />
                            </button>
                        </div>
                    )) : <h1 style={{ fontSize: '30px', position: 'absolute', top: '200px', left: '290px' }}>No users found</h1>}
            <div className={Style.siddiv}>
                <div className={Style.siddivm}>
                    <h1 className={Style.h}>{sex}</h1>
                    <h1 className={Style.h}>Id : {idu}</h1>
                    <h1 className={Style.h}>Name : {nom}</h1>
                    <h1 className={Style.h}>Role : {role}</h1>
                    <h1 className={Style.h}>groupe : {group}</h1>
                </div>
                <div className={Style.btnsA}>
                    <button onClick={() => setCreat(true)}>Creat User</button>
                    <button onClick={()=>setModifier(true)}>Modify Info</button>
                </div>
            </div>
        </div>}</div>}
        </>
    );
}

export default AdmineHero;

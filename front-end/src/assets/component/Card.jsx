  import React, { useEffect, useState } from 'react';
  import TextEditor from './TextEditor';
  import Style from'./Styles/Card.module.css'
  import Icon from '@mdi/react';
  import { mdiBookOpenBlankVariantOutline } from '@mdi/js';
  import { mdiDeleteEmptyOutline } from '@mdi/js';
  import { mdiContentCopy } from '@mdi/js';


  function Card({id_E,id_from, id_report,name, onDelete,role}) {
    const [editingId, setEditingId] = useState(true);
    const [rolec, setRole] = useState('');

          
      const fetchData = async (id) => {
        console.log(id);
        if (!id) return; // Ensure ID is provided
    
        try {
          
          const response = await fetch('http://localhost/back_endgenerale/DeletReport.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify the content type
          },
          body: JSON.stringify({ id: id }), // Send the ID in the body as JSON
        });
          
    
          if (response.ok) {
            const data = await response.json();
            
            console.log(data)
            onDelete();
          } else {
            alert('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }
    
    
     
      
      
    

    
    return (
    <div className={Style.containe}>
      <p className={Style.pC} style={{textAlign:'center'}}>{name}</p>
      {editingId? (
    <div className={Style.container2}>
      <button className={Style.buttonC} >
        <Icon path={mdiBookOpenBlankVariantOutline} size={1} color={"#a7a8a8"} onClick={() => setEditingId(!editingId)}/>
      </button>
      <button className={Style.buttonC} onClick={()=>fetchData(id_report)}>
        <Icon path={mdiDeleteEmptyOutline} size={1.3} color={"#a7a8a8"}/>
      </button>
     
    </div>
  ) 
  : 
  (
    <TextEditor id_E={id_E} id_from={id_from}  id={id_report} role={role} onClose={() => setEditingId(!editingId)} />
  )}

    
  </div>

    );
  }

  export default Card
import React, { useEffect, useState } from 'react';
import Style from './Styles/Creat.module.css';
import Icon from '@mdi/react';
import { mdiCloseOutline } from '@mdi/js';
import TextEditor from './TextEditor';

function CreatReaport({id ,onClose}) {
    const [reportName,setReportName] =useState('');
    const [report,setReport] =useState('');
    const [closed, setClosed] = useState(false);

    const handleOnChange = (event) => {
        setReportName(event.target.value);
        console.log(event.target.value);
      };

    
        
    
        const fetchData1 = async () => {
          try {
            const response = await fetch('http://localhost/back_endgenerale/CreatReport.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, reportName }),
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data); // Handle the response data as needed
            fetchData(data.id);
           // fetchData(data.id);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          } 
        };



        const fetchData = async (id) => {
            if (!id) return; // Ensure ID is provided
        
            try {
              
              const response = await fetch('http://localhost/back_endgenerale/OpenReport.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Specify the content type
              },
              body: JSON.stringify({ id: id }), // Send the ID in the body as JSON
            });
              
        
              if (response.ok) {
                const data = await response.json();
                setReport(data[0].id);
                setClosed(true)
                console.log(data)
              } else {
                alert('Failed to fetch data');
              }
            } catch (error) {
              console.error('Error:', error);
            }
         }
    
        
    
    
  return (
    <div className={Style.containerCreat}> 
           <button className={Style.buttonXCreat} onClick={onClose}><Icon path={mdiCloseOutline} size={1} /></button>
        <div className={Style.containerCreatm}>
        <input
                onChange={handleOnChange}
                className={Style.inputCreat}
                type="text"
                placeholder="Type your report name..."
                value={reportName}
              />
            <button className={Style.btnCreat} onClick={()=>fetchData1()}>Create</button>
        </div>
        {closed ?<TextEditor id={report} onClose={()=>setClosed(false)}/>:null}
    </div>
  )
}

export default CreatReaport
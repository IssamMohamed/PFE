import React, { useState,useEffect } from 'react';
import Style from './Styles/NavBar.module.css'
import Hero from './Hero'
import CreatReaport from './CreatReaport';
import Concatination from './Concatination';

function NavBar({id}) {
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [rerender, setRerender] = useState(true);
  const [creat, setCreat] = useState(false);
  const [concatinate, setConcatinate] = useState(false);

  useEffect(() => {
    
    const fetchMyReport = async () => {
      setReports([]);
      
      try {
        const response = await fetch('http://localhost/back_endgenerale/MyReport.php', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id}), // Make sure to replace 'your-password-here' with the actual password or variable containing the password
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setReports(data); 
        
        console.log(data.sender); // Do something with the fetched data
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    const fetchOtheRport = async () => {
      setReports([]);
      try {
        
        const response = await fetch('http://localhost/back_endgenerale/OtherReport.php', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id}), // Make sure to replace 'your-password-here' with the actual password or variable containing the password
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setReports(data);
        

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    if(report==='my'){
      fetchMyReport();
    }else{
      fetchOtheRport();
    }
    
    
    
  }, [report,rerender]);

  
  return (
    <>
    <div className={Style.container}>
    <img className={Style.image} src='https://logovtor.com/wp-content/uploads/2019/12/sonatrach-logo-vector.png' width={"100px"} height={"100px"}/>
        <div className={Style.container2}>
        <button className={Style.button1} onClick={()=>{setReport('my');setRerender(!rerender)}}>My report</button>
        <button className={Style.button1} onClick={()=>{setReport('other');setRerender(!rerender)}}>Other report</button>
        <button className={Style.button1} onClick={()=>setConcatinate(true)}>Concatinate</button>
        </div>
        <button className={Style.button3} onClick={()=>setCreat(true)}>Create</button>
    </div>
    {report ? <Hero id_E={id} reports={reports} reRender={()=>setRerender(!rerender)}/> :<h1>Hello</h1>}
    {creat ? <CreatReaport id={id}  onClose={()=>setCreat(false)}/> :null}
    {concatinate ? <Concatination id={id}  onClose={()=>setConcatinate(false)}/> :null}
    </>
  )
}

export default NavBar
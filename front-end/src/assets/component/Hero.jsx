import React, { useState,useEffect } from 'react';

import Card from './Card'
import Style from './Styles/Hero.module.css'

function Hero({reports,id_E,reRender,role}) {
  


  

  return (
    <>
    <div className={Style.Hero}>
    { reports.length > 0 ? reports.map((card) => (
        <Card  id_E={id_E} id_from={card.id_from} id_report={card.id} name={card.name} onDelete={()=>reRender()} role={role}/>
        
      )):<h1  style={{ fontSize: '30px', position: 'absolute', top: '200px', left: '290px' }}>No reports found</h1>}
    </div>
    </>
  )
}

export default Hero
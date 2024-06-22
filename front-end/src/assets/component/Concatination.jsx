import React, { useState } from 'react'

function Concatination({id , onClose}) {

    const[name,setName]=useState('');
    const fetchConcatination = async () => {
        
        
        try {
          const response = await fetch('http://localhost/back_endgenerale/Concatination.php', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id,name}), // Make sure to replace 'your-password-here' with the actual password or variable containing the password
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log(data);
          
          onClose();
          
          console.log(data.sender); // Do something with the fetched data
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
  return (
    <div style={{  
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #bfbfbf',
        borderRadius:"15px",
        width: '300px',
        height: '200px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        
        zIndex: 500 }}>
            <button onClick={onClose} 
            style={
                {
                    position: 'absolute',
                    top:"10px",
                    right:"140px",
                } 
            }
            >X</button>
    <input 
        type="text" 
        value={name} 
        placeholder='name...'
        onChange={(e) => setName(e.target.value)}
        style={{
            padding: '10px', // Add some padding around the text
            fontSize: '16px', // Set font size
            borderRadius: '5px', // Round the corners of the input
            border: 'none', // Add a light border
            // Optional: Add a subtle shadow for depth
            resize:'none', 
            outline: 'none',
        }}
    />
    <button 
        style={{
            backgroundColor: '#dedede', // Button background color
            color: 'white', // Text color
            padding: '10px 20px', // Padding around the text inside the button
            borderRadius: '15px', // Rounded corners
            border: 'none', // No border
            cursor: 'pointer', // Changes the cursor to pointer on hover
            marginTop: '10px', // Adds some space above the button
        }}
        onClick={fetchConcatination}
    >
        Ok
    </button>
</div>
  )
}

export default Concatination
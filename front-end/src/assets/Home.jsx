import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Style from'./component/Styles/Home.module.css'


function Home() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const target = event.target;
    const value =target.value;
    const name = target.name;

    if (name === 'id') {
      setId(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost/back_endgenerale/user.php', { // Replace '/your-api-endpoint' with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }), // Assuming your backend expects JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Process the response data as needed
      if (data.role === 'Chef') {
        navigate(`/chef-group/${id}`);
      } else if (data.role === 'Employee') {
        navigate(`/employee/${id}`);
      } 
      else if (data.role === 'Admine') {
        navigate(`/admine/${id}`);
      }else {
        navigate(`/director/${id}`);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  };

  return (
    <div className={Style.containerHome}>
    <form className={Style.formHome} onSubmit={handleSubmit} >
      <img className={Style.img} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAclBMVEX1gh8AAAD/iCDmeh3/iiH5hB+TThOFRhHddRz8hiDjeR1XLgtULAtcMQtKJwpPKgrufh5iNA1qOA22YRfTcBu+ZRjHahk7HwcxGgY3HQd4QA+gVRVwOw6NSxIgEQT/jiKsWxYrFwUmFAURCQJBIggZDQOJSmvLAAADDElEQVRoge2Zi3KjIBRA4cJV8ImKJNE8bJr8/y/uVdNu2rRbSDc72xnPZFRgcgIIgjeMLSwsLLxDa2OEYYh0PR1e8scDfvIlX3d/Wq9WPQwWGbr21WY6YEy479mLKkHUqPOGTlFE9UVNoFgDQ0tpxLlRczNCfkxHvFWkYrpqtIU+omsX52WnxYZqbhRq5Zyln3SIKkFjg5oimngTk79q4Fn2PUR83wtT9Ibk6MpDXTXNdqcFB8h7cCX4V5yarAFsHUHeyqfDUO9XToIGm7OVRG3Tw9kCCM4Ml1APlO8tN3nTjri4llmrj6sz3zRtQ5St4Y11XQl2sz7uuRh4446V7WLtK8ckGtntBs0A2tWcICKlsdmmeawQAaQ8ntqDbaRprLf7MjDGsUE9lHAFWv/OICvo6fZB10mc5gDeNzLR8k9rte8C6vum6nABtYSP0eaqJMCtbZwVRFmWWZalaZoT1Uw9s53oLmyNv3vgoQj/Xj8+UC6C3f5yXOSL/C75KfJi5z1Dr+XNQX4NPWd83W/kq138NX3A4/yOPh/8F6Jw+dMja87vuqG+/H/j/GfJaRv1QDlWD5TTJvyBctrEieRr1F1y7QWwO+Q/dygu8kXOhaf7Hvna/7kVLH9SAY8WdUMSX7ns+8Kgtzm8AXZXcnNbHiAXN5jrmqvb8gB38A39T96JHruGLvJFHiCvqip/Ib0mu6IcKWY2AVP0k/DNH/hm/HXiI8ff8I4Y+0Gm9Y8STUxBKw2aWgsgxzbPbRccmATNLmGtuT+4kiG9gt1qTQfOSwFpceatNrSpLk7yzAvgRY81FW2mzMqwp+yZh4Ryn3unozXqOJN5B/0RugpZWkDCUfMG4pK28CfY1pr1DvcDXQWE59TARVxJ2W8gHcAdIY+ljC9yC3VHqROkOwlW4VlB7x/KpUm048Ksy4o7KHpoOSpeFvxEckZyTJ6LjK9B8TTlinGro4AgNBo3LpPW0TBLDDMJLarW0omp6XNJjSdaPSnbhLxYzGP3ddm9/G2Br3H+S4q9xP4XFhYW/iG/AIidOlKLdsj/AAAAAElFTkSuQmCC"  />
      <input
        className={Style.inputHome}
        type="text"
        id="id"
        name="id"
        value={id}
        onChange={handleInputChange}
        placeholder='Enter your Id...'
      />
      <input
        className={Style.inputHome}
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handleInputChange}
        placeholder='Enter your password...'
      />

      <button type="submit" className={Style.btnHome}>Login</button>
    </form>
    
  </div>
    
  );
}

export default Home;

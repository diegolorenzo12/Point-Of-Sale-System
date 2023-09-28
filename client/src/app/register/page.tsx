'use client'
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import logo from "../assets/MangoLavandaLogo.png";
import Image from 'next/image';
import axios from 'axios';

export default function Regiser() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
        const data = {
            email: email,
            password: password,
            name: name, 
        };
        const response = await axios.post('http://localhost:3001/api/auth/signup',data);

        // Handle the response as needed
            console.log('Registration successful:', response.data);
            
            // You can also redirect the user or perform other actions here

    } catch (error) {
        // Handle errors
        console.error('Registration failed:', error);
    }

  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <div className='rounded drop-shadow-lg bg-white p-[20px]'>
        <Image src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto 20px auto', maxWidth: '100%' }} />
        <Input 
          size="large" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="mb-5"
        />
        <Input 
          size="large" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="mb-5"
        />
        
        <Input 
          size="large" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-5"
        />
        
        <Button 
          block 
          size="large" 
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

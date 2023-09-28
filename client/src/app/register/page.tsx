'use client'
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import logo from "../assets/MangoLavandaLogo.png";
import Image from 'next/image';


export default function Regiser() {
    const [email, setEmail] = useState('');
    const [nip, setNip] = useState('');
    const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (nip.length > 4 || password.length > 4) {
      console.error('El NIP y la contraseña no deben exceder los 4 caracteres');
      return;
    }

    console.log('NIP:', nip, 'Contraseña:', password);  // Aquí puedes manejar el inicio de sesión como necesites
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
          value={nip} 
          onChange={(e) => setNip(e.target.value)} 
          maxLength={4} 
          className="mb-5"
        />
        <Input 
          size="large" 
          placeholder="Name" 
          value={nip} 
          onChange={(e) => setNip(e.target.value)} 
          maxLength={4} 
          className="mb-5"
        />
        
        <Input 
          size="large" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          maxLength={4} 
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

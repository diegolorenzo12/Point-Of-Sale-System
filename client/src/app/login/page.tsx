'use client'
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import logo from '../assets/MangoLavandaLogo.png';  // Asegúrate de que la ruta sea correcta

const Login = () => {
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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
      <div style={{ maxWidth: '400px', padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
        <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto 20px auto', maxWidth: '100%' }} />
        
        <Input 
          size="large" 
          placeholder="NIP" 
          value={nip} 
          onChange={(e) => setNip(e.target.value)} 
          maxLength={4} 
          style={{ marginBottom: '20px', width: '100%' }}
        />
        
        <Input 
          size="large" 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          maxLength={4} 
          style={{ marginBottom: '20px', width: '100%' }}
        />
        
        <Button 
          block 
          size="large" 
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default Login;

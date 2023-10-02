'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";
import Navbar from './components/Navbar';
import axios from 'axios';
import { useState, useMemo } from 'react';
import { UserProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] })
axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [userData, setUserData] = useState({ name: 'Name', email: 'email@example.com', isLoggedIn: false });

  const userValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return (
    <html lang="en">
        <body className={inter.className}>
          <NextUIProvider>
            <UserProvider>
              <Navbar/>
              {children}
            </UserProvider>
          </NextUIProvider>
        </body>
      </html>
  )
}

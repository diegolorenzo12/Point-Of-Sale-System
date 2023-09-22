'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import {NextUIProvider} from "@nextui-org/react";
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <NextUIProvider>
            <Navbar/>
            {children}
          </NextUIProvider>
        </body>
      </html>
  )
}

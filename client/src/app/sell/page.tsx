'use client'
import React from 'react'
import {Tabs, Tab, Card, CardBody, CardHeader, Button} from "@nextui-org/react";
import Frutas from './components/Frutas';


export default function page() {
  return (
    <main className='flex flex-row'>
        <div>
            aqui va la calculando la suma
        </div>
        <div className="flex w-full flex-col">
            <Tabs aria-label="Dynamic tabs" variant='light'>
                <Tab key={1} title="Frutas y Verduras">
                    <Frutas/>
                </Tab>
                <Tab key={2} title="Carnes">
                    <Frutas/>
                </Tab>
                <Tab key={3} title="Lacteos">
                    <Frutas/>
                </Tab>
            </Tabs>  
        </div>
    </main>
  )
}

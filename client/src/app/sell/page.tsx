'use client'
import React from 'react'
import {Tabs, Tab, Card, CardBody, CardHeader, Button, Skeleton} from "@nextui-org/react";
import Frutas from './components/Frutas';
import Carne from "./components/Carne";
import Lacteos from "./components/Lacteos"

export default function page() {
  return (
    <main className='flex flex-row'>
        <div className='flex '>
            aqui va la calculando la suma
        </div>
        <div className="flex flex-col">
            <Tabs aria-label="Dynamic tabs" variant='light'>
                    <Tab key={1} title="Frutas y Verduras">
                        <Frutas/>
                    </Tab>
                <Tab key={2} title="Carnes">
                    <Carne/>
                </Tab>
                <Tab key={3} title="Lacteos">
                    <Lacteos/>
                </Tab>
            </Tabs>  
        </div>
    </main>
  )
}

'use client'
import React, {useState} from 'react'
import {Tabs, Tab, Card, CardBody, CardHeader, Button, Divider} from "@nextui-org/react";
import Frutas from './components/Frutas';
import Carne from "./components/Carne";
import Lacteos from "./components/Lacteos"

export default function page() {
    const [cuenta, setCuenta] = useState([]);
    return (
        <main className='flex flex-row'>
            <div className='flex flex-col w-1/4 m-7'>
                <div className='flex flex-row justify-between'>
                    <p className='font-bold'>Coffee</p>
                    <p>100</p>
                </div>
                <Divider></Divider>
                <div className='m-5 flex flex-col items-center'>
                    <h3 className='text-xl font-semibold'>{100} Mx</h3>
                    <div className='flex flex-row w-full justify-evenly mt-7'>
                        <Button color='success'>Buy</Button>
                        <Button color="danger">Cancel</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-3/4 m-7">
                <Tabs aria-label="Dynamic tabs" variant='solid'>
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

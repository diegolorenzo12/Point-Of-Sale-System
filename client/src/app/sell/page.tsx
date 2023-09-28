'use client'
import React, {useState} from 'react'
import {Tabs, Tab, Button, Divider} from "@nextui-org/react";
import TabItem from './components/TabItem';

type CuentaItem = {
    name: string;
    value: number;
};

export default function page() {

    //should get this values from api
    const cuentaInicial: CuentaItem[] = [
        {
            name: "coffe",
            value: 100
        },
        {
            name: "coffe1",
            value: 103
        }
    ]


    const [cuenta, setCuenta] = useState< CuentaItem[] >(cuentaInicial);
    const sumOfValues = cuenta.reduce((total, item) => total + item.value, 0);
    const itemMap = new Map<string, { sum: number; count: number }>();

    cuenta.forEach((item) => {
        if (itemMap.has(item.name)) {
            const existingItem = itemMap.get(item.name)!;
            existingItem.sum += item.value;
            existingItem.count += 1;
        } else {
            itemMap.set(item.name, { sum: item.value, count: 1 });
        }
    });

    return (
        <main className='flex flex-row'>
            <div className='flex flex-col w-1/4 m-7'>
               {Array.from(itemMap).map(([name, { sum, count }], index) => (
                    <div className="flex flex-row justify-between" key={index}>
                    <p className="font-bold">
                        ({count}x) {name} 
                    </p>
                    <p>{sum}</p>
                    </div>
                ))}
                <Divider></Divider>
                <div className='m-5 flex flex-col items-center'>
                    <h3 className='text-xl font-semibold'>{sumOfValues} Mx</h3>
                    <div className='flex flex-row w-full justify-evenly mt-7'>
                        <Button color='success'>Buy</Button>
                        <Button color="danger">Cancel</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-3/4 m-7">
                <Tabs aria-label="Dynamic tabs" variant='solid'>
                    <Tab key={1} title="Frutas y Verduras">
                        <TabItem cuenta={cuenta} setCuenta={setCuenta} category="Frutas"/>
                    </Tab>
                    <Tab key={2} title="Carnes">
                        <TabItem cuenta={cuenta} setCuenta={setCuenta} category="Carnes"/>
                    </Tab>
                    <Tab key={3} title="Lacteos">
                        <TabItem cuenta={cuenta} setCuenta={setCuenta} category="Lacteos"/>
                    </Tab>
                </Tabs>  
            </div>
        </main>
    )
}

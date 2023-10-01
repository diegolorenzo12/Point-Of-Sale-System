'use client'
import React, {useState} from 'react'
import {Tabs, Tab, Button, Divider} from "@nextui-org/react";
import TabItem from './components/TabItem';
import axios from 'axios';
import ProtectedRoute from '../components/ProtectedRoute';

type CuentaItem = {
    _id: string;
    name: string;
    value: number;
};
axios.defaults.withCredentials = true;

export default function page() {
    const [cuenta, setCuenta] = useState< CuentaItem[] >([]);
    const sumOfValues = cuenta.reduce((total, item) => total + item.value, 0);
    const itemMap = new Map<string, { sum: number; count: number; id: string }>();


    cuenta.forEach((item) => {
        if (itemMap.has(item.name)) {
            const existingItem = itemMap.get(item.name)!;
            existingItem.sum += item.value;
            existingItem.count += 1;
        } else {
            itemMap.set(item.name, { sum: item.value, count: 1, id: item._id });
        }
    });

    const handleBuy = async () => {
        try {
            const employeeId = "employee_id_here"; // Should get from login
            const items = cuenta.map((item) => ({
            product: item._id, 
            quantity: item.value, 
            }));

            const requestBody = {
            employeeId: employeeId,
            items: items,
            };

            const response = await axios.post('http://localhost:3001/api/sales', requestBody);

            if (response.status === 201) {
            setCuenta([]);
            console.log('Sale created successfully');
            } else {
            console.error('Error creating sale:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ProtectedRoute>

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
                            <Button color='success' onPress={()=>handleBuy()}>Buy</Button>
                            <Button color="danger" onPress={()=>setCuenta([])}>Cancel</Button>
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
        </ProtectedRoute>
    )
}

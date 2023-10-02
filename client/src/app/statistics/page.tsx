'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@nextui-org/react';
import ProtectedRoute from '../components/ProtectedRoute';
import BarChart from './components/BarChart';

interface SaleItem {
  _id: string;
  product: {
    _id: string;
    name: string;
  };
  quantity: number;
}

interface Sale {
  _id: string;
  Date: string;
  items: SaleItem[];
}

const SoldProducts: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<{ [name: string]: number }>({});

  useEffect(() => {
    axios.get<Sale[]>('http://localhost:3001/api/sales')
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  // Process the data to group products and merge quantities
  useEffect(() => {
    const grouped: { [name: string]: number } = {};

    salesData.forEach((sale) => {
      sale.items.forEach((item) => {
        const productName = item.product.name;
        if (grouped[productName]) {
          grouped[productName] += item.quantity;
        } else {
          grouped[productName] = item.quantity;
        }
      });
    });

    setGroupedProducts(grouped);
  }, [salesData]);
  console.log(groupedProducts)

  return (
    <ProtectedRoute>
      <div>
        <h1 className='text-center font-bold mb-7'>Sold Products</h1>
        <div className='flex flex-row w-full'>
          <div className='w-1/4 flex flex-col flex-wrap'>
            {Object.entries(groupedProducts).map(([productName, quantity]) => (
              <div key={productName} className='flex flex-col justify-evenly flex-wrap'>
                <Card className='p-7 m-3 bg-slate-200' >
                  <h2>Product Name: {productName}</h2>
                  <p>Quantity Sold: {quantity}</p>
                </Card>
              </div>
            ))}
          </div>
          <div className='w-3/4 px-8'>
            <BarChart groupedProducts={groupedProducts} /> 
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SoldProducts;

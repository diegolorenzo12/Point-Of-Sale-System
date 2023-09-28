import React, {useState, useEffect} from 'react'
import { Card, CardBody, CardFooter, button } from '@nextui-org/react'
import Image, { StaticImageData } from 'next/image'
import frutas from "../../assets/Fruit-HD-Wallpapers-03484.jpg"
import masFrutas from "../../assets/GM-White-Page-214.jpg"
import axios from 'axios';

type CuentaItem = {
    name: string;
    value: number;
};

type ItemType = {
    img: string;
    name: string;
    value: number;
};

export default function TabItem({cuenta, setCuenta, category}: {cuenta:CuentaItem[], setCuenta:React.Dispatch<React.SetStateAction<CuentaItem[]>>, category:String }) {
  
  const [productData, setProductData] = useState<ItemType[]>([]);
  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = `http://localhost:3001/api/products/?category=${category}`;

    // Fetch data from the API using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Map the API response to match the ItemType structure
        const mappedData: ItemType[] = response.data.map((item: any) => ({
          img: item.imageUrl,
          name: item.name,
          value: item.price, // Assuming 'price' is the value you want to display
        }));

        // Update state with the mapped data
        setProductData(mappedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [category]);

  console.log(productData);
    return (
    <div className='flex flex-row flex-wrap'>
        {productData.map((item, index) => (
        <Card
          key={index}
          shadow="sm"
          isPressable
          onPress={() => {setCuenta( [...cuenta, {
            name: item.name,
            value: item.value
          }])}}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              width={100}
              height={100}
              alt="image"
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">
              {item.value}$
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

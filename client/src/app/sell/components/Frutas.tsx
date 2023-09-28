import React from 'react'
import { Card, CardBody, CardFooter, button } from '@nextui-org/react'
import Image, { StaticImageData } from 'next/image'
import frutas from "../../assets/Fruit-HD-Wallpapers-03484.jpg"
import masFrutas from "../../assets/GM-White-Page-214.jpg"

type CuentaItem = {
    name: string;
    value: number;
};

type ItemType = {
    img: StaticImageData;
    name: string;
    value: number;
};

const frutasDommy: ItemType[]=[
    {
        img:frutas,
        name: "Fruta",
        value: 10
    },
    {
        img:masFrutas,
        name: "Fruta2",
        value: 15
    }
];

export default function Frutas({cuenta, setCuenta}: {cuenta:CuentaItem[], setCuenta:React.Dispatch<React.SetStateAction<CuentaItem[]>> }) {
    
    return (
    <div className='flex flex-row'>
        {frutasDommy.map((item, index) => (
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

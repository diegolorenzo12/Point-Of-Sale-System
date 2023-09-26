import React from 'react'
import { Card, CardBody, CardFooter, button } from '@nextui-org/react'
import Image from 'next/image'
import frutas from "../../assets/Fruit-HD-Wallpapers-03484.jpg"
import masFrutas from "../../assets/GM-White-Page-214.jpg"
import LoadingImage from './LoadingImage'
import { Skeleton } from '@nextui-org/react'

export default function Frutas() {
  return (
    <div className='flex flex-row'>
            <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                    <Image
                width="100"
                height={100}
                alt="image"
                className="w-full object-cover h-[140px]"
                src={frutas}
                />
                </CardBody>
                <CardFooter className="text-small justify-between">
                    <b>Fruta</b>
                    <p className="text-default-500">100 pelucholares</p>
                </CardFooter>
            </Card>
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
                <Image
                width="100"
                height={100}
                alt="image"
                className="w-full object-cover h-[140px]"
                src={masFrutas}
                />
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b>Fruta</b>
                <p className="text-default-500">100$</p>
            </CardFooter>
        </Card>
    </div>
  )
}

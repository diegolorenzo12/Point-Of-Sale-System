'use client'
import React from 'react'
import {Button, Input} from "@nextui-org/react";


export default function page() {
  return (
    <div className='text-center mx-auto'>
      <h1 className='mb-7 font-bold'>Add New Product</h1>
      <div className='flex flex-col  items-center'>
        <Input
          className='m-2 w-1/4'
          key="1"
          type="text"
          label="name"
          labelPlacement="inside"
        />
        <Input
          className='m-2 w-1/4'
          key="2"
          type="text"
          label="category"
          labelPlacement="inside"
        />
        <Input
          className='m-2 w-1/4'
          key="3"
          type="text"
          label="description"
          labelPlacement="inside"
        />
        <Input
          className='m-2 w-1/4'
          key="4"
          type="text"
          label="Brand"
          labelPlacement="inside"
        />
        <Input
          className='m-2 w-1/4'
          key="5"
          type="number"
          label="Price"
          labelPlacement="inside"
        />
        <Input
          className='m-2 w-1/4'
          key="6"
          type="number"
          label="stock"
          labelPlacement="inside"
        />
        <Button color='primary'>Add</Button>
      </div>
    </div>
  )
}
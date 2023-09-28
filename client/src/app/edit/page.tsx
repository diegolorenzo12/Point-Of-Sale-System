'use client'
import React, {useState} from 'react'
import {Button, Input} from "@nextui-org/react";
import axios from 'axios';


export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    brand: '',
    price: '',
    stock: '',
  });

    // File input state
  const [file, setFile] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

const handleSubmit = async () => {
  try {
    // Create a FormData object
    const formDataObject = new FormData();

    // Append the file
    formDataObject.append('file', file);

    // Append other form data fields
    formDataObject.append('name', formData.name);
    formDataObject.append('category', formData.category);
    formDataObject.append('description', formData.description);
    formDataObject.append('brand', formData.brand);
    formDataObject.append('price', formData.price);
    formDataObject.append('stock', formData.stock);

    // Make a POST request using Axios with FormData
    await axios.post('http://localhost:3001/api/products', formDataObject);

    // Reset the form after successful submission
    setFormData({
      name: '',
      category: '',
      description: '',
      brand: '',
      price: '',
      stock: '',
    });
    setFile(null);
    window.alert('Product added successfully!');

  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
};


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
          isRequired
          onValueChange={(value)=>handleInputChange("name", value)}
        />
        <Input
          className='m-2 w-1/4'
          key="2"
          type="text"
          label="category"
          labelPlacement="inside"
          isRequired
          onValueChange={(value)=>handleInputChange("category", value)}
        />
        <Input
          className='m-2 w-1/4'
          key="3"
          type="text"
          label="description"
          labelPlacement="inside"
          isRequired
          onValueChange={(value)=>handleInputChange("description", value)}
        />
        <Input
          className='m-2 w-1/4'
          key="4"
          type="text"
          label="Brand"
          labelPlacement="inside"
          isRequired
          onValueChange={(value)=>handleInputChange("brand", value)}
        />
        <Input
          className='m-2 w-1/4'
          key="5"
          type="number"
          label="Price"
          labelPlacement="inside"
          isRequired
          onValueChange={(value)=>handleInputChange("price", value)}
        />
        <Input
          className='m-2 w-1/4'
          key="6"
          type="number"
          label="stock"
          labelPlacement="inside"
          isRequired
          onValueChange={(value)=>handleInputChange("stock", value)}
        />
        <input type="file" accept=".jpg, .png" name="file" onChange={handleFileChange}/>
        <Button color='primary' onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  )
}
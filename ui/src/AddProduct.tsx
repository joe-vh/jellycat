import Modal from "./Modal";
import React, {useCallback, useState} from "react";
import {createPortal} from "react-dom";

interface AddProductProps {
  fetchProducts: Function;
}

const AddProduct = ({fetchProducts}: AddProductProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [open, setOpen] = useState(false);

  const createProduct = useCallback(async () => {
    try {
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, description, price: Number(price), quantity: Number(quantity)})
      });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  }, [name, description, price, quantity, fetchProducts]);

  return (
    <>
      <li onClick={() => setOpen(true)}>Add product</li>
      {createPortal(
        <Modal setOpen={setOpen} setSave={createProduct} open={open} title={'Add Product'}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name"
                   value={name}
                   maxLength={80}
                   onChange={e => setName(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Name" required/>
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" id="description"
                   value={description}
                   maxLength={200}
                   onChange={e => setDescription(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Description" required/>
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" id="price"
                   value={price}
                   onChange={e => setPrice(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Price" required/>
          </div>
          <div className="mb-6">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
            <input type="number" id="quantity"
                   value={quantity}
                   onChange={e => setQuantity(e.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Quantity" required/>
          </div>
        </Modal>,
      document.body)}
    </>
  );
}

export default AddProduct;
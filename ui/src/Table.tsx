import React, {useCallback, useState} from "react";
import Product from "./Product";
import DataTable from "react-data-table-component";
import {createPortal} from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './redux/cartSlice';

import Modal from "./Modal";
import {RootState} from "./redux/store";

interface TableProps {
  fetchProducts: Function;
  filteredProducts: Array<Product>;
}

const Table = ({fetchProducts, filteredProducts}: TableProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<number | null>(null);

  const updateProduct = useCallback(async () => {
    try {
      await fetch('http://localhost:5000/products', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: currentProduct, name, description, price: Number(price), quantity: Number(quantity)})
      });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  }, [currentProduct, name, description, price, quantity, fetchProducts]);

  const deleteProduct = useCallback(async (id: number) => {
    try {
      await fetch('http://localhost:5000/products', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      });
      fetchProducts();
    } catch (e) {
      console.error(e);
    }
  }, [fetchProducts]);

  const cartValue = useSelector((state: RootState) => state.cart.value)
  const dispatch = useDispatch()

  const columns = [
    {
      name: 'Name',
      selector: (row: Product) => row.name,
      width: '200px'
    },
    {
      name: 'Description',
      selector: (row: Product) => row.description,
      width: '250px'
    },
    {
      name: 'Price',
      selector: (row: Product) => Number(row.price).toFixed(2),
      width: '80px'
    },
    {
      name: 'Quantity',
      selector: (row: Product) => row.quantity,
      width: '100px'
    },
    {
      name: 'Update',
      cell: (row: Product) => <button onClick={() => {
        setCurrentProduct(row.id);
        setName(row.name);
        setDescription(row.description);
        setPrice(Number(row.price).toFixed(2));
        setQuantity(row.quantity);
        setOpen(true);
      }}>Update</button>,
      width: '80px'
    },
    {
      name: 'Add to Cart',
      cell: (row: Product) => <button onClick={() => dispatch(addItem(row.id))}>{cartValue.includes(row.id) ? 'Added' : 'Add to Cart'}</button>,
      width: '120px'
    },
    {
      name: 'Delete',
      cell: (row: Product) => <button onClick={() => deleteProduct(row.id)}>Delete</button>,
      width: '80px'
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
      />
      {
        createPortal(
          <Modal setOpen={setOpen} setSave={updateProduct} open={open} title={'Update Product'}>
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
          document.body)
      }
    </>
  );
}

export default Table;
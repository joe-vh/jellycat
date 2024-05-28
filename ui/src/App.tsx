import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import AddProduct from './AddProduct';
import Product from "./Product";
import Table from "./Table";


function App() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const json = await response.json();
      setProducts(json);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product: Product) => product.name.includes(filter) || product.description.includes(filter) || product.price.includes(filter));

  return (
    <div className="App">
        <div className="container mx-auto">
            <div className="flex flex-row flex-wrap py-4">
                <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
                    <div className="sticky top-0 p-4 w-full">
                        <ul className="flex flex-col overflow-hidden">
                            <AddProduct fetchProducts={fetchProducts} />
                        </ul>
                    </div>
                </aside>
                <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
                    <h1 className="text-3xl font-bold underline">
                        Product List
                    </h1>
                    <br />
                    <div className="mb-6">
                      <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter</label>
                      <input type="text" id="filter"
                             value={filter}
                             onChange={e => setFilter(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             placeholder="Filter" required/>
                    </div>
                    <Table
                      fetchProducts={fetchProducts}
                      filteredProducts={filteredProducts}
                    />
                </main>
            </div>
        </div>
        <footer className="mt-auto">

        </footer>

    </div>
  );
}

export default App;

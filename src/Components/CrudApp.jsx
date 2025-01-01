import React, { useState } from "react";

const CrudApp = () => {

  const [products, setProducts] = useState([]); // State for the product list
  const [name, setName] = useState(""); // State for the product name input
  const [price, setPrice] = useState(""); // State for the price input
  const [description, setDescription] = useState(""); // State for the description input

  const handleAddProduct = () => {
    // if (!name || !price || !description) {
    //   setError(true);
    //   return;
    // }
    // setError(false);

    const newProduct = {
      // id: Date.now(),
      name,
      price,
      description,
    };

    setProducts([...products, newProduct]); // Add new product to the list
    setName(""); // Clear input fields
    setPrice("");
    setDescription("");
  };
  const HandleDeleteProduct= (index) =>{
const CopyOfPorducts =[...products]
CopyOfPorducts.splice(index, 1);
setProducts(CopyOfPorducts);

  }
  return (
    <div className="min-h-screen bg-gray-500 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Product CRUD System</h1>

        {/* Error Box */}
        {/* {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">All fields are required!</span>
          </div>
        )} */}

        {/* Form Section */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
          onClick={handleAddProduct}
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Product List</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
        {products.map((product)=>(
           <tr key={product.id}> 
           <td className="border px-4 py-2">{product.name}</td>
           <td className="border px-4 py-2">{product.price}</td>
           <td className="border px-4 py-2">{product.description}</td>
           <td className="border px-4 py-2">
             <button
               className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
             >
               Edit
             </button>
             <button
             onClick={()=>HandleDeleteProduct(product.id)}
               className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
             >
               Delete
             </button>
           </td>
         </tr>
        )
               
       
          
        )

        }
              {/* Additional rows can be added dynamically */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrudApp;

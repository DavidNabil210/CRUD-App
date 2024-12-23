import React, { useState, useEffect } from "react";

const CrudApp = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(""); // State for error messages

//   // Load products from local storage on component mount
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
//     setProducts(storedProducts);
//   }, []);

//   // Save products to local storage whenever they change
//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.price || !form.description) {
      setError("All fields (Name, Price, Description) are required!");
      return;
    }
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({ id: null, name: "", price: "", description: "" });
    setError(""); // Clear error message on success
  };

  const handleUpdate = () => {
    if (!form.name || !form.price || !form.description) {
      setError("All fields (Name, Price, Description) are required!");
      return;
    }
    setProducts(products.map((p) => (p.id === form.id ? form : p)));
    setForm({ id: null, name: "", price: "", description: "" });
    setIsEditing(false);
    setError(""); // Clear error message on success
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const closeErrorBox = () => {
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Product CRUD System</h1>
        
        {/* Form */}
        <div className="mb-6">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={isEditing ? handleUpdate : handleAdd}
            className={`w-full px-4 py-2 text-white font-bold rounded-md ${
              isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* Product List */}
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error Box */}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-800">{error}</p>
            <button
              onClick={closeErrorBox}
              className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudApp;

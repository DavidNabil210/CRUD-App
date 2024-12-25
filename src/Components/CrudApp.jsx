import React, { useState, useEffect } from "react";
import ProductList from "./ProductList"; // Import the ProductList component

const CrudApp = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

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
    setError("");
  };

  const handleUpdate = () => {
    if (!form.name || !form.price || !form.description) {
      setError("All fields (Name, Price, Description) are required!");
      return;
    }
    setProducts(products.map((p) => (p.id === form.id ? form : p)));
    setForm({ id: null, name: "", price: "", description: "" });
    setIsEditing(false);
    setError("");
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
            className="block w-full px-4 py-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mb-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mb-2 border rounded-md"
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

        {/* Pass products and action handlers to ProductList */}
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CrudApp;

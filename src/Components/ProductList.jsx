import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      {products.length > 0 ? (
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
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;

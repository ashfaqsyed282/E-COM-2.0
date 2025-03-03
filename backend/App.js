import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // ✅ Function to handle product editing
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // ✅ Function to update product details
  const handleSave = async (updatedData) => {
    if (!editingProduct) return;

    const res = await fetch(
      `http://localhost:5000/api/products/${editingProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (res.ok) {
      fetchProducts(); // Refresh product list
      setEditingProduct(null); // Close form after saving
    }
  };

  return (
    <div>
      <h1>Product List</h1>

      {editingProduct ? (
        <ProductForm selectedProduct={editingProduct} onSave={handleSave} />
      ) : (
        products.map((product) => (
          <ProductCard key={product._id} product={product} onEdit={handleEditClick} />
        ))
      )}
    </div>
  );
};

export default ProductList;

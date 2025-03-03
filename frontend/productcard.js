import React from "react";

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      
      {/* ✅ Add Edit Button */}
      <button onClick={() => onEdit(product)}>Edit</button>
    </div>
  );
};

export default ProductCard;

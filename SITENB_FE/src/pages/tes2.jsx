// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tes from './Tes';

const tes2 = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Untuk menyimpan produk yang dipilih
  const [isModalOpen, setIsModalOpen] = useState(false); // Kontrol modal

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/admin/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data.data.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDetailClick = (product) => {
    setSelectedProduct(product); // Set produk yang dipilih
    setIsModalOpen(true); // Buka modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false); // Tutup modal
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-4">
            <h2 className="text-xl">{product.title}</h2>
            <p>Price: ${product.category_id}</p>
            <button
              onClick={() => handleDetailClick(product)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              Detail
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <Tes product={selectedProduct} onClose={handleCloseModal}   title="Detail Tiket Pegawai BNPT" />
      )}
    </div>
  );
};

export default tes2;

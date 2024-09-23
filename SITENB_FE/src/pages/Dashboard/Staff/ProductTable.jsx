import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Mengambil token dari localStorage

        axios.get('http://localhost:8000/api/admin/products', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Received data:', response.data); // Cek format data
        
            if (response.data && response.data.products && Array.isArray(response.data.products)) {
                setProducts(response.data.products); // Akses data produk dengan benar
            } else if (Array.isArray(response.data)) {
                setProducts(response.data); // Jika data adalah array langsung
            } else {
                throw new Error('Unexpected data format');
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
            setError('There was an error fetching the data. Please try again later.');
            setLoading(false);
        });
    }, []); // Dependency array kosong untuk menjalankan efek sekali saat komponen dimounting

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <Task products={products} />
        </div>
    );
};

export default ProductTable;

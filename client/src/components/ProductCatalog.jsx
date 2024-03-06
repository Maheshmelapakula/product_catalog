// ProductCatalog.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4001/product/product');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const addNewProductRow = () => {
    const newProduct = {
      name: '',
      description: '',
      price: 0,
    };

    setProducts([...products, newProduct]);
  };

  const enterEditMode = (productId) => {
    setEditMode(productId);
    setEditedData({});
  };

  const exitEditMode = () => {
    setEditMode(null);
    setEditedData({});
  };

  const updateEditedData = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const saveEditedProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:4001/product/${productId}`, editedData);
      const updatedProducts = products.map((product) =>
        product._id === productId ? { ...product, ...editedData } : product
      );
      setProducts(updatedProducts);
      exitEditMode();
      console.log(`Product with ID ${productId} updated successfully.`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4001/product/${productId}`);
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
      exitEditMode();
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '0 auto',
  };

  const cellStyle = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2',
  };

  const ellipsisStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={addNewProductRow}>+</button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Price</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td style={cellStyle}>
                {editMode === product._id ? (
                  <input
                    type="text"
                    value={editedData.name ?? product.name}
                    onChange={(e) => updateEditedData('name', e.target.value)}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td style={cellStyle}>
                {editMode === product._id ? (
                  <input
                    type="text"
                    value={editedData.description ?? product.description}
                    onChange={(e) => updateEditedData('description', e.target.value)}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td style={cellStyle}>
                {editMode === product._id ? (
                  <input
                    type="text"
                    value={editedData.price ?? product.price}
                    onChange={(e) => updateEditedData('price', e.target.value)}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td style={ellipsisStyle}>
                {editMode === product._id ? (
                  <button onClick={() => saveEditedProduct(product._id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => enterEditMode(product._id)}>Edit</button>
                    <div onClick={() => deleteProduct(product._id)}>Delete</div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCatalog;

import React, { useState } from 'react';
import {v4 as uuidv4}  from 'uuid';

import FormAddProduct from './FormAddProduct';
import FormEditProduct from './FormEditProduct';
import ProductCard from './ProductCard';

const productsArray = [
  {productId: 0, name:"Empire Combat BT-4", price: 749, url: 'https://paintball.sklep.pl/userdata/public/gfx/986c999d7685c8e7ae6c8d854976542a.jpg', available: true},
  {productId: 1, name:"Maska Field Thermall", price: 139, url: 'https://paintball.sklep.pl/environment/cache/images/500_500_productGfx_2646/Field-One-thermal-4.jpg', available: false},
  {productId: 2,name:"Butla Dye 0.8l", price: 249, url: 'https://paintball.sklep.pl/userdata/public/gfx/2988/butla-HP-Dye-LT.jpg', available: true}]

const ProductList = () => {
  const [products, setProducts] = useState(productsArray)
  const [elementToEdit, setElementToEdit] = useState(null)

  const handleAddProduct = (product) => {
    if(!product) return
      setProducts(prev => [...prev, product])
  }

  const handleDelete = (id)=>{
    const productsAfterDeleteItem = products.filter(({productId})=> productId !== id)
    setProducts(productsAfterDeleteItem)
  }
  
  const handleEdit = (id)=>{
    document.getElementById('editForm').scrollIntoView({behavior:'smooth'})
    const editProd = products.find(({productId}) => productId === id)    
    setElementToEdit(editProd)
  }

  const productCards = products.map(product => (
    <ProductCard 
      key={uuidv4()} 
      clickDelete={handleDelete} 
      clickEdit={handleEdit} 
      {...product}
    />))
  
  return ( 
  <>
    <div className="manage-products">
      <FormAddProduct 
        products={products} 
        handleAddProduct={handleAddProduct}
      />
      <FormEditProduct 
        handleEdit={handleEdit}
        elementToEdit={elementToEdit} 
        products={products} 
        setProducts={setProducts}
      />
    </div>
    <div className='productList'>
      {productCards}
    </div>
  </> );
}
export default ProductList;
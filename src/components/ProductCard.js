import React from 'react';

const ProductCard = ({available, clickDelete, clickEdit, name, price, productId, url, }) => {

  return ( 
  <>
    <div className='product'>
      <div className='product__image'>
        <img src={url} alt={name}/>
      </div>
      <p className='product__name'>{name}</p>
      <p className='product__price'>{`${price} zł`}</p>
      <p className='product__availability'>{available ? "Dostępny" : "Niedostępny"}</p>
      <div className='product__action-buttons'>
        <button type='button' onClick={()=>clickEdit(productId)} className='button__edit'>Edytuj produkt</button>
        <button type='button' onClick={()=>clickDelete(productId)} className='button__delete'>Usuń produkt</button>
      </div>
    </div>
  </>
  );
}
export default ProductCard;
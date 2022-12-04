import React from 'react';
import FormTemplate from './subcomponents/FormTemplate';

const AddForm = (props) => {
  return (
  <FormTemplate 
    type='add' 
    products={props.products} 
    handleAddProduct={props.handleAddProduct}
  />
  );
}

export default AddForm;
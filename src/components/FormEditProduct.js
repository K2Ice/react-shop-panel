import React from 'react';
import FormTemplate from './subcomponents/FormTemplate';

const EditForm = (props) => {

  return (
  <FormTemplate 
    type='edit'  
    handleEdit={props.handleEdit}
    elementToEdit={props.elementToEdit} 
    products={props.products} 
    setProducts={props.setProducts}
  />
  );
}

export default EditForm;
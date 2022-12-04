import React, {useEffect,useState} from 'react';
import {v4 as uuidv4}  from 'uuid';

const FormTemplate = (props) => {
  const [availability, setAvailability] = useState(true)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [nameError, setNameError] = useState(false)
  const [priceError, setPriceError] = useState(false) 
  const [urlError, setUrlError] = useState(false)
  const [editElement, setEditElement] = useState(null)

  // EDIT TYPE
  useEffect(()=>{
    if(props.type === 'edit' && props.elementToEdit){
      setEditElement(props.elementToEdit)
    }
  }, [props.elementToEdit, props.type])

  useEffect(()=>{
    if(editElement === null || Object.keys(editElement).length === 0) return
    else{
      const {name, price, url, available} = editElement
      setName(name)
      setPrice(Number(price))
      setUrl(url)
      setAvailability(available)
    }
  },[editElement])

  const handleSave = ()=>{
    const indexOfProduct = props.products.findIndex(({productId})=> productId === props.elementToEdit.productId)
    const editedProduct ={
      productId: props.elementToEdit.productId,
      name,
      price : Number(Number(price).toFixed(2)),
      url,
      available: availability
    }
    const editedArray =[...props.products]
    editedArray[indexOfProduct] = editedProduct
    props.setProducts(editedArray)
    clear()
  }

  //ADD TYPE
  const handleAdd =()=>{
    const newProduct = {
      productId : uuidv4(),
      name,
      price: Number(Number(price).toFixed(2)),
      url,
      available: availability,
    }
    props.handleAddProduct(newProduct)
    clear()
  }

  // UNIVERSAL COMPONENT CODE
  const validateForm = ()=>{
    const isNameInvalid = (name.length === 0 || name === "") ? true : false;
    const isPriceInvalid = (isNaN(Number(price)) || Number(price) <= 0) ? true : false;

    const urlRegex = /(^https?:\/\/).+(\.(com|pl|de|it|es)).+/i
    const isUrlInvalid = (!urlRegex.test(url)) ? true : false;

    if(isNameInvalid || isPriceInvalid || isUrlInvalid){
      setNameError(isNameInvalid)
      setPriceError(isPriceInvalid)
      setUrlError(isUrlInvalid)
    }
    else if(props.type==='add') handleAdd()
    else if(props.type==='edit') handleSave()
  }

  const clear = ()=>{
    setAvailability(true)
    setName("")
    setPrice("")
    setUrl("")
    setNameError(false)
    setPriceError(false)
    setUrlError(false)
  }

  return ( 
  <form id={`${props.type}Form`}>
    <h1>{props.type === 'edit' ? 'Edytuj' : 'Dodaj' } produkt</h1>
    <div className={`${props.type}-name`}>
      <label htmlFor={`${props.type}-product-name`}>Produkt</label>
      <span className='error'>{nameError && "Produkt musi posiadać nazwę"}</span>
      <input 
        placeholder='nazwa'
        name='name'
        id={`${props.type}-product-name`} 
        type="text" 
        value={name}
        onChange={(e)=> setName(e.target.value)}
      />
    </div>
    <div className={`${props.type}-price`}>
      <label htmlFor={`${props.type}-product-price`}>Cena</label>
      <span className='error'>{priceError && "Cena musi być większa od 0"}</span>
      <input 
        name='price' 
        id={`${props.type}-product-price`} 
        type="number" 
        placeholder='99.99'
        value={price}
        onChange={(e)=> setPrice(e.target.value)}
      />
    </div>
    <div className={`${props.type}-url`}>
      <label htmlFor={`${props.type}-product-url`}>Zdjęcie (link)</label>
      {urlError && <span className='error'>`Wymagany format:<span className='link-pattern'>http://domena.pl/</span></span>}
      <input 
        name='url'
        id={`${props.type}-product-url`} 
        type="url"
        placeholder='http//:'
        value={url}
        onChange={(e)=> setUrl(e.target.value)}
      />
    </div>
    <div className={`${props.type}-available`}>
      <label htmlFor={`${props.type}-product-available`}>Dostępność:</label>
      <select 
        name='availability'
        id={`${props.type}-product-available`}
        value={availability}
        onChange={(e)=> setAvailability(()=> e.target.value === 'true'? true : false)}
        >
        <option value={true}>Dostępny</option>
        <option value={false}>Niedostępny</option>
      </select>
    </div>
    <button type='button' onClick={validateForm}>{props.type === 'edit' ? 'Edytuj' : 'Dodaj' } produkt</button>
  </form> 
  );
}
export default FormTemplate;
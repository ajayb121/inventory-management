import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.scss';

const EditItem = ({
  rowItem,
  closeModal,
  updateData,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [inputValue, setInputValue] = useState({
    productName: rowItem.product_name,
    sellerName: rowItem.seller_name,
    materialType: rowItem.material_type,
    priceVersion: rowItem.price_version,
    quantity: rowItem.total_quantity,
    price: rowItem.price,
    note: rowItem.note,
  });

  const handleChange = (event, type) => {
    setInputValue({
      ...inputValue,
      [type]: event.target.value,
    });
  }

  useEffect(() => {
    let isValid = true;
    Object.keys(inputValue).map((key) => {
      if (!inputValue[key]) {
        isValid = false;
      }
    });
    if (isValid && isButtonDisabled) {
      setIsButtonDisabled(false);
    } else if (!isValid && !isButtonDisabled) {
      setIsButtonDisabled(true);
    }
  }, [inputValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    axios.post(`/api/items/edit/${rowItem._id}`, {
      product_name: inputValue.productName,
      seller_name: inputValue.sellerName,
      material_type: inputValue.materialType,
      price_version: inputValue.priceVersion,
      total_quantity: inputValue.quantity,
      price: inputValue.price,
      note: inputValue.note,
    })
      .then(({ data }) => {
        updateData(data);
        closeModal();
      })
      .catch((error) => {
        // debugger;
      });
  }

  return (
    <div>
      <div className="editHeader">Edit Item</div>
      <div className="addItemContainer">
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <div className="inputLabel">
              Product Name:
            </div>
            <input type="text" value={inputValue.productName} onChange={(ev) => handleChange(ev, 'productName')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Seller Name:
            </div>
            <input type="text" value={inputValue.sellerName} onChange={(ev) => handleChange(ev, 'sellerName')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Material Type:
            </div>
            <input type="text" value={inputValue.materialType} onChange={(ev) => handleChange(ev, 'materialType')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Price Version:
            </div>
            <input type="number" value={inputValue.priceVersion} onChange={(ev) => handleChange(ev, 'priceVersion')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Quantity:
            </div>
            <input type="number" value={inputValue.quantity} onChange={(ev) => handleChange(ev, 'quantity')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Price:
            </div>
            <input type="number" value={inputValue.price} onChange={(ev) => handleChange(ev, 'price')} />
          </div>
          <div className="inputContainer">
            <div className="inputLabel">
              Note:
            </div>
            <textarea value={inputValue.note} onChange={(ev) => handleChange(ev, 'note')} />
          </div>
          <div className="inputNote">*<div>All fields are required.</div></div>
          <div className="submitBtn">
            <input disabled={isButtonDisabled} type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;

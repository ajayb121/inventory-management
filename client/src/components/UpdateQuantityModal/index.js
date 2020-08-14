import React, { useState } from 'react';
import axios from 'axios';

import { ORDER_TYPE } from '../../utils/enums';

import './index.scss';

const UpdateQuantityModal = ({
  type,
  rowItem,
  closeModal,
  updateData,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const updateQuantity = () => {
    setIsButtonDisabled(true);
    axios.post('/api/items/updateCount', {
      ...rowItem,
      quantity: (type === ORDER_TYPE.BUY) ? inputValue : -inputValue,
    })
      .then(({ data }) => {
        updateData(data);
        closeModal();
        // setCsvData(data);
      })
      .catch((error) => {
        // debugger;
      });
  }

  const onInputChange = ({ target: { value } }) => {
    if (value.length) {
      const reg = /^\d+$/;
      if (reg.test(value)) {
        if ((type === ORDER_TYPE.BUY && value <= 10000) || (value <= rowItem.total_quantity)) {
          showError && setShowError(false);
          isButtonDisabled && setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
          setShowError(true);
        }
        setInputValue(+value);
      }
    } else {
      setIsButtonDisabled(true);
      setInputValue(value);
    }
  };

  const {
    product_name,
    seller_name,
    material_type,
    price_version,
  } = rowItem;

  return (
    <div>
      <div className="buySellHeader">{`${product_name}-${seller_name}-${material_type}-${price_version}`}</div>
      <div className="buySellContainer">
        <div className="buySellInputContainer">
          <div className="inputLabel">
            Quantity:
          </div>
          <input type="number" value={inputValue} onChange={onInputChange} />
        </div>
        {/* <span>Quantity: </span>
        <input onChange={onInputChange} value={inputValue} /> */}
        {/* </div> */}
        {showError && (
          <div className="warning">
            <div>Enter value less than {type === ORDER_TYPE.BUY ? 10000 : rowItem.total_quantity}.</div>
          </div>
        )}
        <div className={type === ORDER_TYPE.BUY ? "buyBtn" : "sellBtn"}>
          <button disabled={isButtonDisabled} onClick={updateQuantity}>{type === ORDER_TYPE.BUY ? "Buy" : "Sell"}</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuantityModal;

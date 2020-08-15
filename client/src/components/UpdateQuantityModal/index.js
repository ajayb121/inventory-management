import React, { useState } from 'react';
import axios from 'axios';

import { ORDER_TYPE } from '../../utils/enums';

import './index.scss';

const UpdateQuantityModal = ({
  type,
  rowItem,
  closeModal,
  updateData,
  showSuccessToast,
  showErrorToast,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const [inputNote, setInputNote] = useState("");
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const updateQuantity = () => {
    setIsButtonDisabled(true);
    axios.post(`/api/items/updateCount/${rowItem._id}`, {
      quantity: (type === ORDER_TYPE.BUY) ? inputValue : -inputValue,
    })
      .then(({ data }) => {
        updateData(data);
        axios.post(`/api/logs`, {
          ...rowItem,
          quantity: inputValue,
          note: inputNote,
          order_type: type,
        });
        closeModal();
        showSuccessToast();
      })
      .catch((error) => {
        debugger;
        closeModal();
        showErrorToast();
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

  const handleNoteChange = (ev) => {
    setInputNote(ev.target.value);
  }

  const {
    product_name,
    seller_name,
    model_name,
    material_type,
    price_version,
  } = rowItem;

  return (
    <div>
      <div className="buySellHeader">{`${model_name} (v${price_version})`}</div>
      <div className="buySellContainer">
        <div className="inputContainer">
          <div className="inputLabel">
            Quantity:
          </div>
          <input type="number" value={inputValue} onChange={onInputChange} />
        </div>
        <div className="warningContainer">
          {showError && (
            <div className="warning">
              <div>Enter value less than {type === ORDER_TYPE.BUY ? 10000 : rowItem.total_quantity}.</div>
            </div>
          )}
        </div>
        <div className="textInputContainer">
          <div className="inputLabel">
            Note:
            </div>
          <textarea value={inputNote} onChange={handleNoteChange} />
        </div>
        <div className={type === ORDER_TYPE.BUY ? "buyBtn" : "sellBtn"}>
          <button disabled={isButtonDisabled} onClick={updateQuantity}>{type === ORDER_TYPE.BUY ? "Buy" : "Sell"}</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuantityModal;

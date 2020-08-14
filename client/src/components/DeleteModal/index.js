import React, { useState } from 'react';
import axios from 'axios';

import { ORDER_TYPE } from '../../utils/enums';

import './index.scss';

const DeleteModal = ({
  type,
  rowItem,
  closeModal,
  updateData,
}) => {
  const [inputValue, setInputValue] = useState(1);
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const deleteRow = () => {
    setIsButtonDisabled(true);
    axios.delete(`/api/items/${rowItem._id}`)
      .then(({ data }) => {
        updateData(data);
        closeModal();
        // setCsvData(data);
      })
      .catch((error) => {
        // debugger;
      });
  }

  const {
    product_name,
    seller_name,
    material_type,
    price_version,
  } = rowItem;

  return (
    <div>
      <div className="buySellHeader">{`${product_name}-${seller_name}-${material_type}-${price_version}`}</div>
      <div className="deleteContainer">
        <div className="deleteLabel">
          Do you confirm to delete ?
        </div>
        <div className={"deleteBtn"}>
          <button disabled={isButtonDisabled} onClick={deleteRow}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

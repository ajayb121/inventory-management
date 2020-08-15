import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CSVLink } from "react-csv";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrimaryLayout from './components/common/primaryLayout';
import UpdateQuantityModal from './components/UpdateQuantityModal';
import { ORDER_TYPE, MODAL_TYPE } from './utils/enums';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import DeleteModal from './components/DeleteModal';

import './App.scss';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rowItem, setRowItem] = useState({});
  const [modalType, setModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getModal = (type) => {
    switch (type) {
      case MODAL_TYPE.BUY:
        return (<UpdateQuantityModal
          rowItem={rowItem}
          type={ORDER_TYPE.BUY}
          closeModal={closeModal}
          updateData={setCsvData}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />);
      case MODAL_TYPE.SELL:
        return (<UpdateQuantityModal
          rowItem={rowItem}
          type={ORDER_TYPE.SELL}
          closeModal={closeModal}
          updateData={setCsvData}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />);
      case MODAL_TYPE.ADD:
        return (<AddItem
          closeModal={closeModal}
          updateData={setCsvData}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />);
      case MODAL_TYPE.EDIT:
        return (<EditItem
          rowItem={rowItem}
          closeModal={closeModal}
          updateData={setCsvData}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />);
      case MODAL_TYPE.DELETE:
        return (<DeleteModal
          rowItem={rowItem}
          closeModal={closeModal}
          updateData={setCsvData}
          showErrorToast={showErrorToast}
          showSuccessToast={showSuccessToast}
        />);
      default:
        return (<div>Hello World</div>);
    }
  }

  useEffect(() => {
    axios.get('/api/items')
      .then(({ data }) => {
        setCsvData(data);
      })
      .catch(() => {
        showErrorToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const openModal = (item, type) => {
    setModalType(type);
    setRowItem(item);
  }

  useEffect(() => {
    modalType && setIsModalVisible(true);
  }, [modalType])

  const onAfterClose = () => {
    setModalType(null);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  }

  const headerElements = [
    "Sl. No.",
    "Product Name",
    "Model Name",
    "Seller Name",
    "Material Type",
    "Price Version",
    "Quantity",
    "Price",
    "Operator",
    "Note",
    "",
  ];

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '0',
      transform: 'translate(-50%, -50%)'
    }
  };

  const showErrorToast = (msg = "Something went wrong !") => {
    toast.error(msg, {
      autoClose: 3000,
    });
  };

  const showSuccessToast = (msg = "Success !") => {
    toast.success(msg, {
      autoClose: 3000,
    });
  };

  return (
    <PrimaryLayout>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
          <div className="tableContainer">
            <div className="addBtnContainer">
              <button onClick={() => setModalType(MODAL_TYPE.ADD)}>Add Item</button>
              <button><Link to="/logs">Show Logs</Link></button>
              <button><CSVLink data={csvData}>Download CSV</CSVLink></button>
            </div>
            <div className="tableStyle header">
              {headerElements.map((el) => {
                return (
                  <div>{el}</div>
                );
              })}
            </div>
            {csvData.length > 0 ? (csvData.map((el, index) => {
              const {
                product_name,
                model_name,
                seller_name,
                material_type,
                price_version,
                total_quantity,
                price,
                note,
              } = el;
              return (
                <div className="tableStyle row">
                  <div>{index+1}</div>
                  <div>{product_name}</div>
                  <div>{model_name}</div>
                  <div>{seller_name}</div>
                  <div>{material_type}</div>
                  <div>{price_version}</div>
                  <div>{total_quantity}</div>
                  <div>{price}</div>
                  <div className="btnCotainer">
                    <button className="buy" onClick={openModal.bind(this, el, MODAL_TYPE.BUY)}>Buy</button>
                    <button className="sell" onClick={openModal.bind(this, el, MODAL_TYPE.SELL)}>Sell</button>
                  </div>
                  <div>{note}</div>
                  <div className="btnCotainer">
                    <button className="edit" onClick={openModal.bind(this, el, MODAL_TYPE.EDIT)}>Edit</button>
                    <button className="delete" onClick={openModal.bind(this, el, MODAL_TYPE.DELETE)}>Delete</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="tableStyle emptyData" >
              No data! Pease add Item.
            </div>
          )}
          </div>
        )}
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </div>
      <Modal
        isOpen={isModalVisible}
        onAfterClose={onAfterClose}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {getModal(modalType)}
      </Modal>
    </PrimaryLayout>
  );
}

export default App;
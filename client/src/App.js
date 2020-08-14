import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
// import LoginComponent from './components/login-screen';
import PrimaryLayout from './components/common/primaryLayout';
// import AdminComponent from './components/admin-actions';
// import ResultsComponent from './components/results';
import { CSVLink } from "react-csv";
import Modal from 'react-modal';
import UpdateQuantityModal from './components/UpdateQuantityModal';
import { ORDER_TYPE, MODAL_TYPE } from './utils/enums';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import DeleteModal from './components/DeleteModal';

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
        />);
      case MODAL_TYPE.SELL:
        return (<UpdateQuantityModal
          rowItem={rowItem}
          type={ORDER_TYPE.SELL}
          closeModal={closeModal}
          updateData={setCsvData}
        />);
      case MODAL_TYPE.ADD:
          return(<AddItem
            closeModal={closeModal}
            updateData={setCsvData}
          />);
      case MODAL_TYPE.EDIT:
          return(<EditItem
            rowItem={rowItem}
            closeModal={closeModal}
            updateData={setCsvData}
          />);
      case MODAL_TYPE.DELETE:
          return(<DeleteModal
            rowItem={rowItem}
            closeModal={closeModal}
            updateData={setCsvData}
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
      .catch((error) => {
        // debugger;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const deleteRow = ({ _id }) => {
    axios.delete(`/api/items/${_id}`)
      .then(({ data }) => {
        setCsvData(data);
        // closeModal();
        // setCsvData(data);
      })
      .catch((error) => {
        // debugger;
      });
  }

  const openModal = (item, type) => {
    // debugger;
    setModalType(type);
    setRowItem(item);
    // setIsModalVisible(true);
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
    "Product Name",
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

  return (
    <PrimaryLayout>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
          <>
            {csvData.length > 0 && (
              <div className="tableContainer">
                <div className="addBtnContainer">
                  <button onClick={() => setModalType(MODAL_TYPE.ADD)}>Add Item</button>
                  <button><CSVLink data={csvData}>Download CSV</CSVLink></button>
                </div>
                <div className="tableStyle header">
                  {headerElements.map((el) => {
                    return (
                      <div>{el}</div>
                    );
                  })}
                </div>
                {csvData.map((el) => {
                  const {
                    product_name,
                    seller_name,
                    material_type,
                    price_version,
                    total_quantity,
                    price,
                    note,
                  } = el;
                  return (
                    <div className="tableStyle row">
                      <div>{product_name}</div>
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
                }
              </div>
            )}
          </>
        )}
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
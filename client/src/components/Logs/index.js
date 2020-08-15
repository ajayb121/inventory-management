import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";
import axios from 'axios';
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrimaryLayout from '../common/primaryLayout';

import './index.scss';
import { ORDER_TYPE } from '../../utils/enums';

function Logs() {
  const [csvData, setCsvData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/logs')
      .then(({ data }) => {
        const updatedData = data.map((el) => {
          const row = el;
          row.date = moment(el.date).format("DD-MM-YYYY h:mm A");
          return row;
        });
        setCsvData(updatedData);
      })
      .catch(() => {
        showErrorToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const headerElements = [
    "Sl. No.",
    "Date",
    "Product Name",
    "Model Name",
    "Seller Name",
    "Material Type",
    "Price Version",
    "Order Type",
    "Quantity",
    "Price",
    // "Operator",
    "Note",
    // "",
  ];

  const showErrorToast = (msg = "Something went wrong !") => {
    toast.error(msg, {
      autoClose: 3000,
    });
  };

  return (
    <PrimaryLayout>
      <div className="layoutHeader">Order Logs</div>
      {isLoading ? (
        <div className="logsLoader">Loading...</div>
      ) : (
          <div className="tableContainer">
            <div className="addBtnContainer">
              <button><Link to="/">Go to Home Page</Link></button>
              <button><CSVLink data={csvData}>Download CSV</CSVLink></button>
            </div>
            <div className="logTableStyle header">
              {headerElements.map((el) => {
                return (
                  <div>{el}</div>
                );
              })}
            </div>
            {csvData.length > 0 ? (csvData.map((el, index) => {
              const {
                date,
                product_name,
                model_name,
                seller_name,
                material_type,
                price_version,
                order_type,
                quantity,
                price,
                note,
              } = el;
              return (
                <div className="logTableStyle row">
                  <div>{index+1}</div>
                  <div>{date}</div>
                  <div>{product_name}</div>
                  <div>{model_name}</div>
                  <div>{seller_name}</div>
                  <div>{material_type}</div>
                  <div>{price_version}</div>
                  <div className={order_type === ORDER_TYPE.BUY ? "green" : "red"}>{order_type}</div>
                  <div>{quantity}</div>
                  <div>{price}</div>
                  <div>{note}</div>
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
    </PrimaryLayout>
  );
}

export default Logs;
import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Layout = styled.div`
  height: 50px;
  background: #65baec7d;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  cursor: pointer;
  padding-left: 50px;
  font-size: 18px;
  color: #1734d4;
  font-weight: bold;
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;

const PrimaryLayout = ({ children }) => {
  useEffect(() => {
    console.log('Use Effect Working');
    axios.get('/api/items')
      .then(({ data }) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }, []);
  return (
    <div>
      <Layout>
        <Logo>Inventory Management</Logo>
      </Layout>
      {children}
    </div>
  );
};

export default PrimaryLayout;
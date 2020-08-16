import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Layout = styled.div`
  height: 50px;
  background: #5e39807d;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  cursor: pointer;
  padding-left: 20px;
  font-size: 18px;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;

const PrimaryLayout = ({ children }) => {
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
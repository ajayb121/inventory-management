import React, { Component } from 'react';
// import 'react-table/react-table.css';
import ReactTable from 'react-table';
import styled from 'styled-components';
import axios from 'axios';

import './styles.scss';
import { data, columns } from './dummyData';

const Wrapper = styled.div`
  padding: 30px 50px;
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  @media (max-width: 355px) {
    padding: 30px 5px
  }
`;

const ResultsRegion = styled.div`
  padding-bottom: 30px;
`;

const TableWrapper = styled.div`
  padding-top: 10px;
  max-width: 500px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

export default class ResultsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }
  componentDidMount() {
    axios.get('/api/teerResults')
      .then(({ data: results }) => {
        this.setState({
          results,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    const { results } = this.state;
    return (
      <Wrapper>
        <ResultsRegion>
          <Title>
            Results:
          </Title>
          <TableWrapper>
            <ReactTable
              data={results}
              columns={columns}
              pageSize={data.length}
              showPagination={false}
            />
          </TableWrapper>
        </ResultsRegion>
      </Wrapper>
    );
  }
}
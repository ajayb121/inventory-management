import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Select from 'react-select';

const getValues = (minVal, maxVal) => {
  const option = [];
  for (let i = minVal; i <= maxVal; i++) {
    option.push({ value: i, label: i })
  }
  return option;
}

const StyledInput = styled.input`
  width: 500px;
  border-radius: 4px;
  border: 1px solid #bbbaba;
  padding: 10px;
  font-size: 14px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

const DateElement = styled.div`
  width: 200px;
  padding-right: 20px;
`;

const SelectContainer = styled.div`
  padding-top: 5px;
`;

const LabelWrapper = styled.div`
  min-width: 150px;
  @media (max-width: 768px) {
    min-width: 75px;
  }
`;

const Button = styled.button`
  border: 1px solid #18a018;
  background: #7caf7c;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 5px 10px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  left: 400px;
  padding-top: 20px;
  @media (max-width: 768px) {
    left: 105px;
  }
`;

const InputDiv = styled.div`
  padding: 15px 30px;
`;

export default class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLine: '',
      secondLine: '',
      thirdLine: '',
      fourthLine: '',
      fifthLine: '',
      selectedOption: {
        day: { label: 1, value: 1 },
        month: { label: 1, value: 1 },
        year: { label: 2019, value: 2019 },
      },
    };
  }

  onChange = (type, event) => {
    this.setState({ [type]: event.target.value });
  }

  handleChange = (selectedValue, type) => {
    const { selectedOption } = this.state;
    selectedOption[type] = selectedValue;
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedValue);
  };

  submitResult = () => {
    const {
      firstLine,
      secondLine,
      thirdLine,
      fourthLine,
      fifthLine,
      selectedOption: { day, month, year },
    } = this.state;
    if (!firstLine ||
      !secondLine ||
      !thirdLine ||
      !fourthLine ||
      !fifthLine) {
      alert('fill all the fields');
      return;
    }
    const date = {
      day: day.value,
      month: month.value,
      year: year.value,
    }
    axios.post('/api/teerResults', {
      firstLine,
      secondLine,
      thirdLine,
      fourthLine,
      fifthLine,
      date,
    })
      .then(({ data }) => {
        alert('Saved');
        console.log(data);
      })
      .catch((error) => {
        alert('Error in Saving');
      });
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div style={{ padding: '20px' }}>
        Admin Actions
        <div>
          <div style={{ padding: '20px 0' }}>
            Date:
            <DateWrapper>
              <DateElement>
                Day:
                <SelectContainer>
              <Select
                  value={selectedOption.day}
                  onChange={(selectedValue) => this.handleChange(selectedValue, 'day')}
                  options={getValues(1, 31)}
                />
                </SelectContainer>
              </DateElement>
              <DateElement>
                Month:
                <SelectContainer>
              <Select
                  value={selectedOption.month}
                  onChange={(selectedValue) => this.handleChange(selectedValue, 'month')}
                  options={getValues(1, 12)}
                />
                </SelectContainer>
              </DateElement>
              <DateElement>
                Year:
                <SelectContainer>
              <Select
                  value={selectedOption.year}
                  onChange={(selectedValue) => this.handleChange(selectedValue, 'year')}
                  options={getValues(2019, 2022)}
                />
                </SelectContainer>
              </DateElement>
            </DateWrapper>
          </div>
          <InputWrapper>
            <LabelWrapper>
              First Line:
            </LabelWrapper>
            <InputDiv>
              <StyledInput type="text" value={this.state.firstLine} onChange={(event) => this.onChange('firstLine', event)} />
            </InputDiv>
          </InputWrapper>
          <InputWrapper>
            <LabelWrapper>
              Second Line:
            </LabelWrapper>
            <InputDiv>
              <StyledInput type="text" value={this.state.secondLine} onChange={(event) => this.onChange('secondLine', event)} />
            </InputDiv>
          </InputWrapper>
          <InputWrapper>
            <LabelWrapper>
              Third Line:
            </LabelWrapper>
            <InputDiv >
              <StyledInput type="text" value={this.state.thirdLine} onChange={(event) => this.onChange('thirdLine', event)} />
            </InputDiv>
          </InputWrapper>
          <InputWrapper>
            <LabelWrapper>
              Fourth Line:
            </LabelWrapper>
            <InputDiv >
              <StyledInput type="text" value={this.state.fourthLine} onChange={(event) => this.onChange('fourthLine', event)} />
            </InputDiv>
          </InputWrapper>
          <InputWrapper>
            <LabelWrapper>
              Fifth Line:
            </LabelWrapper>
            <InputDiv>
              <StyledInput type="text" value={this.state.fifthLine} onChange={(event) => this.onChange('fifthLine', event)} />
            </InputDiv>
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={this.submitResult}>Submit</Button>
          </ButtonWrapper>
        </div>
      </div>
    );
  }
}
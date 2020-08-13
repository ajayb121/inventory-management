import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import PrimaryLayout from '../common/primaryLayout';
import AdminComponent from '../admin-actions';

const Contaienr = styled.div`
  padding: 20px;
`;

const Error = styled.div`
  color: #f12121;
`;

const LoginContainer = styled.div`
  padding-bottom: 5px;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

const Field = styled.div`
  padding-right: 10px;
  @media (max-width: 768px) {
    min-width: 75px;
  }
`;

const StyledInput = styled.input`
  border-radius: 4px;
  border: 1px solid #bfbaba;
  padding: 5px 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: end;
  }
`;

const Submit = styled.input`
  border: 1px solid #18a018;
  background: #7caf7c;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 2px 10px;
  cursor: pointer;
`;

const SubmitWrapper = styled.div`
  @media (max-width: 768px) {
    padding-left: 84px;
    padding-top: 20px;
  }
`;

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      loginSuccess: false,
      showError: false,
      errorMessage: '',
    };
  }

  onUserNameChange = (event) => {
    this.setState({ userId: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    const { userId, password } = this.state;
    axios.post('/api/login/validate', {
      userId,
      password,
    })
      .then(({ data }) => {
        const { loginSuccess } = data;
        if (loginSuccess) {
          this.setState({
            showError: false,
            loginSuccess,
          });
        } else {
          this.setState({
            showError: true,
            errorMessage: "Incorrect credentials! Please enter again."
          });
        }
      })
      .catch((error) => {
        this.setState({
          showError: true,
          errorMessage: "Something went wrong! Please reload the page."
        });
      });
    event.preventDefault();
  }

  render() {
    const { showError, errorMessage, loginSuccess } = this.state;
    return (
      <PrimaryLayout>
        {loginSuccess ? (
          <div><AdminComponent /></div>
        ) : (
            <Contaienr>
              <LoginContainer>
                <form onSubmit={this.handleSubmit}>
                  <Wrapper>
                    <label>
                      <FieldWrapper>
                        <Field>
                          Name:
                      </Field>
                        <div>
                          <StyledInput type="text" value={this.state.userId} onChange={this.onUserNameChange} />
                        </div>
                      </FieldWrapper>
                    </label>
                    <label>
                      <FieldWrapper>
                        <Field>
                          Password:
                    </Field>
                          <StyledInput type="password" value={this.state.password} onChange={this.onPasswordChange} />
                      </FieldWrapper>
                    </label>
                    <SubmitWrapper>
                      <Submit type="submit" value="Submit" />
                    </SubmitWrapper>
                  </Wrapper>
                </form>
              </LoginContainer>
              {showError && (
                <Error>
                  {errorMessage}
                </Error>
              )}
            </Contaienr>
          )}
      </PrimaryLayout>
    );
  }
}
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../fBase";
import styled from "styled-components";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        //create Account
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //Log in
        await signInWithEmailAndPassword(auth, email, password);
      }
      // console.log(data); auth.currentUser object
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <FormStyled onSubmit={onSubmit}>
      <input
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        required
      />
      <SubmitStyled>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </SubmitStyled>
      <span>{error}</span>
      <ToggleStyled onClick={(e) => toggleAccount()}>
        {newAccount ? "Sign in " : "Create Account"}
      </ToggleStyled>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;

  input {
    max-width: 320px;
    width: 100%;
    padding: 10px;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: 10px;
    font-size: 12px;
    color: black;
  }

  span {
    color: tomato;
    text-align: center;
    font-weight: 500;
    font-size: 12px;
  }
`;

const ToggleStyled = styled.div`
  color: #04aaff;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`;

const SubmitStyled = styled.div`
  input {
    text-align: center;
    background: #04aaff;
    color: white;
    margin-top: 10px;
  }
`;
export default AuthForm;

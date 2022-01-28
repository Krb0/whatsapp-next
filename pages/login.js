import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>Whatsapp | Login</title>
        <meta name="description" content="Login page for Whatsapp Next App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginContainer>
        <Logo src="https://anthoncode.com/wp-content/uploads/2019/01/whatsapp-2.png" />
        <SignButton onClick={signIn} variant="outlined">
          Sign in With Google
        </SignButton>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
const LoginContainer = styled.div`
  padding: 100px;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;
const Logo = styled.img`
  height: 200px;
  aspect-ratio: 1;
`;
const SignButton = styled(Button)`
  &&& {
    font-weight: 700;
    border-color: #070707;
    color: #242424;
    :hover {
      background-color: rgba(5, 5, 5, 0.09);
    }
  }
`;

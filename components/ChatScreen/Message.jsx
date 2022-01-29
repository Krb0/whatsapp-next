import React from "react";
import styled from "styled-components";
const Message = ({ user, message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

export default Message;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  p {
    background-color: #e9eaeb;
    min-width: 200px;
    max-width: 400px;
    min-height: 30px;
    max-height: 200px;
    word-wrap: break-word;
    padding: 1rem;
    border-radius: 9px;
    align-self: flex-end;
  }
`;

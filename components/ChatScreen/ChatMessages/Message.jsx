import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../../firebase";
import moment from 'moment';
const Message = ({ author, message, timestamp }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = author === userLoggedIn.email ? Sender : Receiver;
  return (
    <Container>
      <TypeOfMessage>
        {message}
        <Timestamp>

        {timestamp ? moment(timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;
const Container = styled.div`
  
`;

const MessageElement = styled.p`
  width: fit-content;
  padding:15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 80px;
  max-width: 400px;
  word-wrap:break-word;
  max-height: 800px;
  padding-bottom: 26px;
  position:relative;
  text-align: right;
`
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;

`;
const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;
const Timestamp = styled.span`
  color:gray;
  padding:10px;
  font-size: 12px;
  position:absolute;
  bottom:0;
  text-align:right;
  right:0;
  `
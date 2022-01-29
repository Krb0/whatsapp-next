import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Loading from "../../Loading";
import Message from "./Message";
import { v4 as uuid } from "uuid";
import { showMessages } from "./utils/showMessages";
import { getMessages } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import scrollTo from "./utils/scrollTo";
const ChatMessages = ({ id }) => {
  const [messagesSnapshot] = useCollection(getMessages(id));
  const endOfMessageRef = useRef(null);
  useEffect(() => {
    scrollTo(endOfMessageRef);
  }, [messagesSnapshot, endOfMessageRef]);

  return (
    <MessageContainer>
      {messagesSnapshot ? (
        showMessages(messagesSnapshot).map((msg) => (
          <Message {...msg} timestamp={msg?.timestamp?.toDate()} key={id} />
        ))
      ) : (
        <Loading />
      )}
      <EndOfMessage ref={endOfMessageRef} />
    </MessageContainer>
  );
};

export default ChatMessages;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div``;

import React, { useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
// import components
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
//import utils
const ChatScreen = ({ users }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <ChatHeader users={users} />
      <ChatMessages id={id} />
      <ChatInput id={id} />
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div`
  > svg {
    position: absolute;
    top: 20px;
  }
`;

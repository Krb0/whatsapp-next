import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
const Chat = ({ messages, chat }) => {
  const { users } = JSON.parse(chat);
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  return (
    <Container>
      <Head>
        <title>Chat with | {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen users={users} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const chatRef = doc(db, "chats", id);
  const chat = await getDoc(chatRef, id);
  const messages = await getDocs(collection(db, `chats/${id}/messages`));
  return {
    props: {
      chat: JSON.stringify(chat.data()),
      messages: JSON.stringify(messages.docs.map((doc) => doc.data())),
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

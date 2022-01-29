import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

import {
  collection,
  query,
  orderBy,
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import getRecipientEmail from "../../utils/getRecipientEmail";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import Message from "./Message";
import { serverTimestamp } from "firebase/firestore";

const ChatScreen = ({ users, messages }) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const messagesCollection = collection(db, `chats/${id}/messages`);
  const orderedMessages = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );
  const [messagesSnapshot] = useCollection(orderedMessages);
  const recipientEmail = getRecipientEmail(users, user);
  const letterCount = input.length;
  const showMessages = () => {
    const filteredMessage = messagesSnapshot.docs.map((doc) => doc.data() )
    return filteredMessage;
  };
  const sendMessage = (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", user.uid);
    const chatRef = collection(db, `chats/${id}/messages`);
    setDoc(userRef, { lastSeen: serverTimestamp() }, { merge: true });
    addDoc(chatRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };
  return (
    <Container>
      <Header>
        <Avatar src={recipientEmail.photoURL} />
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          <p>Last Seen</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {messagesSnapshot ? (
          showMessages().map((msg) => (
            <Message message={msg.message} key={uuid()} />
          ))
        ) : (
          <CircularProgress />
        )}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <span>{letterCount ? letterCount : 0} / 250</span>
        <IconButton>
          <MicIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;

  span {
    color: gray;
    font-size: 15px;
    font-weight: 300;
  }
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;
const EndOfMessage = styled.div``;
const HeaderIcons = styled.div``;

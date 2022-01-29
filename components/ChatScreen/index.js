import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
// import components
import Message from "./Message";
import Loading from '../Loading';
import styled from "styled-components";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { v4 as uuid } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, messagesQuery } from "../../firebase";
import {
  serverTimestamp,
  collection,
  query,
  orderBy,
  setDoc,
  addDoc,
  where,
  doc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
// Import materialUI stuff
import { Avatar } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

import TimeAgo from 'timeago-react';



const ChatScreen = ({ users, messages }) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const endOfMessageRef = useRef(null)

  const [messagesSnapshot] = useCollection(messagesQuery);
  const recipientEmail = getRecipientEmail(users, user);
  const letterCount = input.length;
  const showMessages = () => {
    const filteredMessage = messagesSnapshot.docs.map((doc) => {return {message: doc.data().message, timestamp: doc.data().timestamp, author: doc.data().user}});
    return filteredMessage;
  };
  const usersCollection = collection(db, "users");
  const [recipientQuery] = useCollection(
    query(
      usersCollection,
      where("email", "==", recipientEmail)
    ))
  
  const recipient = recipientQuery?.docs?.[0]?.data();
  const scollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({behavior: "smooth", block: "start"})
  }
  useEffect(() => {scollToBottom()}, [messagesSnapshot])
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
    scollToBottom();
  };
  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientQuery ? (
            <p>
              Last Seen:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}{" "}
            </p>
          ) : (
            <p>Loading...</p>
          )}
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
            <Message
              {...msg}
              timestamp={msg?.timestamp?.toDate()}
              key={uuid()}
            />
          ))
        ) : (
          <Loading />
        )}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <Input
          value={input}
          maxLength={250}
          onChange={(e) => setInput(e.target.value)}
        />
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

const Container = styled.div`
> svg{
  position: absolute;
  top:20px;
}
`;

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

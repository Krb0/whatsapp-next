import React, { useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/material/IconButton";
import { sendMessage } from "../../../firebase";

const ChatInput = ({ id }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  return (
    <InputContainer>
      <IconButton>
        <InsertEmoticonIcon />
      </IconButton>
      <Input
        value={input}
        maxLength={250}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        hidden
        disabled={!input}
        type="submit"
        onClick={(e) => {
          sendMessage(e, id, user, input, setInput);
        }}
      >
        Send Message
      </button>
      <span>{input.length ? input.length : 0} / 250</span>
      <IconButton>
        <MicIcon />
      </IconButton>
    </InputContainer>
  );
};

export default ChatInput;

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

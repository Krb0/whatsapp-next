import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";
import styled from "styled-components";
import SidebarHeader from "./SidebarHeader";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
const Sidebar = () => {
  const [user] = useAuthState(getAuth());
  const [search, setSearch] = useState("");
  const chatCollectionRef = collection(db, "chats");
  const filteredChats = query(
    chatCollectionRef,
    where("users", "array-contains", user?.email)
  );
  const [chatsSnapshot] = useCollection(filteredChats);
  const createChat = async () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return;
    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !(await chatAlreadyExists(input))
    ) {
      addDoc(collection(db, "chats"), { users: [user.email, input] });
    } else {
      alert("Email already exists");
    }
  };
  const chatAlreadyExists = async (recipientEmail) => {
    const docsSnapshot = await getDocs(filteredChats);

    const foundDoc = docsSnapshot.docs.find((doc) =>
      doc.data().users.includes(recipientEmail)
    );
    if (foundDoc) return true;
    else return false;
  };
  return (
    <Container>
      <SidebarHeader user={user} />
      <Search>
        <SearchIcon />
        <SearchInput
          placeholder="Search in chats"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs
        .filter((chat) =>
          chat
            .data()
            .users.some((user) =>
              user.toLowerCase().startsWith(search.toLowerCase())
            )
        )
        .map((chat) => (
          <ChatListItem key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  background: #fafafa;
  border-right: 1px solid #e9eaeb;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  color: #242424;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

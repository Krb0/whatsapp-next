import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
const Sidebar = () => {
  const [user] = useAuthState(getAuth());
  const chatCollectionRef = collection(db, "chats");
  const filteredChats = query(
    chatCollectionRef,
    where("users", "array-contains", user.email)
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
      <Header>
        <UserAvatar
          src={user.photoURL}
          onClick={() => {
            const auth = getAuth();
            signOut(auth);
          }}
        />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <ChatListItem key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

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

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.85;
  }
`;

const IconsContainer = styled.div``;

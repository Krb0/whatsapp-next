import React, { useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getChats } from "../../firebase";
import SidebarButton from "./SidebarButton";
import ChatListItem from "./ChatListItem";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";

const Sidebar = () => {
  const [user] = useAuthState(getAuth());
  const [search, setSearch] = useState("");
  const [chatsSnapshot] = useCollection(getChats(user));

  return (
    <Container>
      <SidebarHeader user={user} />
      <SidebarSearch setSearch={setSearch} />
      <SidebarButton user={user} />
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

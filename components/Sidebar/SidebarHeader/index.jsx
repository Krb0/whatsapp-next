import React from "react";
import SidebarIcons from "./SidebarIcons";
import styled from "styled-components";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
const SidebarHeader = ({ user }) => {
  return (
    <Header>
      <UserAvatar
        src={user.photoURL}
        onClick={() => {
          const auth = getAuth();
          signOut(auth);
        }}
      />
      <SidebarIcons />
    </Header>
  );
};

export default SidebarHeader;

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
  border-bottom: 1px solid #f0f0f0;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.85;
  }
`;

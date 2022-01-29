import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { createChat } from "../../../firebase";

const SidebarButton = ({ user }) => {
  return (
    <StyledSidebarButton onClick={() => createChat(user)}>
      Start a new chat
    </StyledSidebarButton>
  );
};

export default SidebarButton;
const StyledSidebarButton = styled(Button)`
  width: 100%;
  font-weight: 600;
  color: #242424;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

import React from "react";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const SidebarIcons = () => {
  return (
    <IconsContainer>
      <IconButton>
        <ChatIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </IconsContainer>
  );
};

export default SidebarIcons;

const IconsContainer = styled.div``;

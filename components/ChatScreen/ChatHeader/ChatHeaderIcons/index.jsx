import React from "react";
import styled from "styled-components";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
const ChatHeaderIcons = () => {
  return (
    <HeaderIcons>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </HeaderIcons>
  );
};

export default ChatHeaderIcons;
const HeaderIcons = styled.div``;

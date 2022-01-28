import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <StyledLoading />;
};
export default Loading;

const StyledLoading = styled(CircularProgress)`
  width: 80px !important;
  height: 80px !important;
  &&& {
    color: green;
  }
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

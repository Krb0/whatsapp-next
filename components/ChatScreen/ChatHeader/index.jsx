import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { auth, getRecipient } from "../../../firebase";
import getRecipientEmail from "../../../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import ChatHeaderIcons from "./ChatHeaderIcons";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const index = ({ users }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(getRecipient(recipientEmail));
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  return (
    <Header>
      {recipient ? (
        <Avatar src={recipient?.photoURL} />
      ) : (
        <Avatar>{recipientEmail[0]}</Avatar>
      )}

      <HeaderInformation>
        <h3>{recipientEmail}</h3>
        {recipientSnapshot ? (
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
      <ChatHeaderIcons />
    </Header>
  );
};

export default index;

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

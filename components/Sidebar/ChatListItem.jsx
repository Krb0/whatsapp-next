import React from "react";
import Avatar from "@mui/material/Avatar";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import styled from "styled-components";

const ChatListItem = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(getAuth());
  const filteredRecipient = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(users, user))
  );
  const [recipientSnapshot] = useCollection(filteredRecipient);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]} </UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
};

export default ChatListItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

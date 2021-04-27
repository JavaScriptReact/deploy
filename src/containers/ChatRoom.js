import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "./chat/defaultLayout";

function ChatRoom() {
  const { id } = useParams();

  return (
    <>
      <DefaultLayout id={id} />
    </>
  );
}

export default ChatRoom;

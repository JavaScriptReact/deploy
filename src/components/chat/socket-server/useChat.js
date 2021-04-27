import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";

function useChat(roomId, token) {
  const client = useRef(null);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    client.current = io("http://localhost:4000", {
      query: {
        roomId,
      },
    });

    console.log(client.current);

    client.current.on("message", (msg) => {
      setMessage([...message, msg]);
    });
  }, [message, roomId]);

  const sendMessage = (message) => {
    client.current.emit("message", { message, token });
  };

  return { sendMessage, message };
}

export default useChat;

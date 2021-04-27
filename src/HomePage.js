import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import chatIcon from "./chatIcon.jpg";

function HomePage() {
  const history = useHistory();

  const handler = () => {
    history.push("/chat");
  };

  return (
    <>
      <section className="chat-icon" onClick={handler}>
        <img
          src={chatIcon}
          alt="chat icon"
          style={{ height: "100%", width: "100%" }}
        />
      </section>
    </>
  );
}

export default HomePage;

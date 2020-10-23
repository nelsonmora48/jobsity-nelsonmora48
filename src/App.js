import React, { useEffect, useState } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

var io = sailsIOClient(socketIOClient);
io.sails.url = "http://localhost:1337";

function App() {
  const [queue, setQueue] = useState([]);
  const [payload, setPayload] = useState("");

  const handleMessage = (e) => {
    setPayload(e.target.value);
    e.target.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    io.socket.get("/message/room0", { payload: payload });
    setPayload("");
  };

  const handleMessageReceived = (data) => {
    setQueue((oldData) => [...oldData, ...data]);
  };

  useEffect(() => {
    io.socket.get("/join/room0");
    io.socket.on("message", (data) => handleMessageReceived(data));
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message_input"
          value={payload}
          onChange={handleMessage}
        ></input>
        <input type="submit" value="Send" />
      </form>
      {console.log(queue)}
      {queue.map((data, k) => (
        <p key={k}><b>{data.user}:</b>{data.payload}</p>
      ))}
    </>
  );
}

export default App;

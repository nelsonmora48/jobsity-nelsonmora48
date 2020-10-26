import React, { useEffect, useState } from "react";
import "./App.css";
// import socketIOClient from "socket.io-client";
// import sailsIOClient from "sails.io.js";

// var io = sailsIOClient(socketIOClient);
// io.sails.url = "http://localhost:1337";

export default function ChatBoard(props) {
  const { io, actualRoom, setActualRoom } = props;
  const [queue, setQueue] = useState([]);
  const [payload, setPayload] = useState("");

  const handleMessage = (e) => {
    setPayload(e.target.value);
    e.target.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    io.socket.get("/message", { payload: payload });
    setPayload("");
  };

  const handleLeaveRoom = (e) => {
    io.socket.get("/leave", { payload: payload });
    setPayload("");
    setQueue((oldData) => []);
    setActualRoom("")
  };

  const handleMessageReceived = (data) => {
    setQueue((oldData) => [...oldData, ...data]);
  };

  useEffect(() => {
    io.socket.get("/rooms");
    io.socket.on("message", (data) => handleMessageReceived(data));
    setQueue([]);
    return (() => io.socket.off("message"))
  }, [actualRoom]);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Messages: {actualRoom}</th>
          </tr>
          {queue.map((data, k) => (
            <tr key={k}>
              <td><b>{data.user}: </b> {data.payload}</td>
            </tr>
          ))}
          <tr>
            <td>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="message_input"
                  value={payload}
                  onChange={handleMessage}
                ></input>
                <input type="submit" value="Send" />
              </form>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={handleLeaveRoom}>Leave Room</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

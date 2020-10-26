import React, { useEffect, useState } from "react";
import "./App.css";
import ChatBoard from "./ChatBoard";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

var io = sailsIOClient(socketIOClient);
io.sails.url = "http://localhost:1337";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [actualRoom, setActualRoom] = useState("");

  const handleNewRoom = (e) => {
    io.socket.get("/roomCreate");
    setActualRoom("");
  };

  const handleJoin = (d) => {
    io.socket.get("/join/" + d.target.name);
    setActualRoom(d.target.name);
  };

  useEffect(() => {
    io.socket.get("/rooms");
    io.socket.on("rooms", (data) => setRooms(data));
  }, []);

  return (
    <>
      <div className='rowstyle'>
        <div className='columnstyle'>
          <table>
            <tbody>
              <tr>
                <th colSpan={2}>Chat Rooms:</th>
              </tr>
              {rooms.map((data, k) => (
                <tr key={k}>
                  <td>{data}</td>
                  <td>
                    <button name={data} onClick={handleJoin}>
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <button onClick={handleNewRoom}>New Room</button>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="columnstyle">
          {actualRoom !== "" && (
            <ChatBoard
              io={io}
              actualRoom={actualRoom}
              setActualRoom={setActualRoom}
            />
          )}
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3003";

const SendData = ({ socket, client }) => {
  const [dataHook, setdataHook] = useState("");
  const [name, setName] = useState("");
  const [tenantname, setTenantname] = useState("");
  const [tenantMessage, setTenantMessage] = useState("");

  useEffect(() => {
    socket.on(name, function (data, fn) {
      console.log("data");
      fn("SENT");
    });
  }, []);

  // const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
  function send() {
    socket.emit("private", {
      data: dataHook,
      clientName: name,
      client: client,
    });
  }

  function creatpersonalRoom() {
    socket.emit("personal", { email: name });
  }

  function createTenantRoom() {
    socket.emit("tenant", { name: name, tenantName: tenantname });
  }

  function sendTenantMessage() {
    socket.emit("tenantMessage", {
      from: name,
      tenantName: tenantname,
      msg: tenantMessage,
    });
  }
  return (
    <div>
      <input
        value={name}
        placeholder="enter name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={creatpersonalRoom}>login</button>
      <input
        value={tenantname}
        placeholder="enter tenantname"
        onChange={(e) => setTenantname(e.target.value)}
      ></input>
      <button onClick={createTenantRoom}>tenant name</button>
      <input
        value={dataHook}
        onChange={(e) => setdataHook(e.target.value)}
      ></input>
      <button onClick={send}>send message</button>
      <input
        value={tenantMessage}
        onChange={(e) => setTenantMessage(e.target.value)}
      ></input>
      <button onClick={sendTenantMessage}>send message to all</button>
    </div>
  );
};

export default SendData;

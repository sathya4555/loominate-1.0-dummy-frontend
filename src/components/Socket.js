import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3003";

export default function Socket({ response }) {
  return <div>{response && <p>......{response}</p>}</div>;
}

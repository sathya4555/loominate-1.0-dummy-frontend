import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import SendData from "./components/SendData";
import Socket from "./components/Socket";
const ENDPOINT = "ws://18.141.166.49:3003";

function App() {
  const [response, setResponse] = useState("");
const [clientProp, setclientProp] = useState('')
  //  function send() {
  //   socket.emit('message', { data: 'from react app' })
  //  }
  const [socketProp, setsocketProp] = useState('')
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    setsocketProp(socket)
    // socket.on("messageClient", (data) => {
    //   setResponse(data.data);
    //   console.log(data.data);
    // });
    socket.on("initial", (data) => {
      console.log('clientdata',data);
      setclientProp(data)
    });
    socket.on("new_msg", function(data) {
        alert("notification: " + data.msg.notificationData + " " + "content: " + data.msg.content);
        console.log('new msg',data.msg)
        // console.log(fn)
        // socket.emit('gotit', { data: data.clientName })

  });

  // socket.on('connect', function () {
  //   socket.emit('ferret', 'tobi', function (data,fn) {
  //     console.log(data); // data will be 'woot'
  //     console.log(fn)
  //   });
  // });

  socket.on('1', function (data, fn) {
    console.log("data");
    fn("SENT");
  });

    
  }, []);
  return (
    <div className="">
     { socketProp && <SendData socket={socketProp} client={clientProp}/>}
      <Socket  response={response} />
    </div>
  );
}

export default App;

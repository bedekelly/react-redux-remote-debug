import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Send all console logs via secure websocket back to the dev server.
const webSocket = new WebSocket("wss://logs.bede.io");
webSocket.onopen = function(event) {
  webSocket.send("Reloaded app.");

  function sendAs(prefix) {
    return msg => webSocket.send(prefix + JSON.stringify(msg));
  }

  window.onerror = sendAs("Exception: ");
  console.error = sendAs("Error: ");
  console.warn = sendAs("Warn: ");
  console.log = sendAs("Log: ");
};

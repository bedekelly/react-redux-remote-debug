import { useEffect } from "react";

/**
 * Retrieve an object's value at a deep path.
 */
function objectPath(obj, pathString) {
  let path = pathString.split(".");
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]];
  }
  return obj;
}

/**
 * Setup all websocket logging of console messages, errors, exceptions.
 * Also setup a two-way connection to redux, allowing dispatching actions
 * and requesting bits of state.
 */
const setupWebsocketLogging = store => () => {
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

    store.subscribe(() => {
      const state = store.getState();
      webSocket.send(JSON.stringify(state));
    });

    webSocket.onmessage = message => {
      if (/dispatch .*/.test(message.data)) {
        const action = JSON.parse(message.data.replace(/dispatch/, ""));
        store.dispatch(action);
      } else if (/get .*/.test(message.data)) {
        const path = message.data.replace(/get\s+/, "");
        const substate = objectPath(store.getState(), path);
        webSocket.send(JSON.stringify(substate));
      }
    };
  };
};

export default function RemoteDebug({ store, children }) {
  useEffect(setupWebsocketLogging(store), []);
  return children;
}

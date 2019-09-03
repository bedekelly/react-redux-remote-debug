import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./Demo.css";
import "./Prefixing.scss";

function throwError() {
  throw new Error("Error message");
}

function Demo() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <hr />

      <button
        className="stateful-button"
        onClick={() => setCounter(counter + 1)}
      >
        {counter}
      </button>
      <h1>Hot Reloading</h1>
      <p>Try clicking the button above, then editing this text.</p>

      <hr />

      <h1>Logging via WebSockets</h1>
      <p>Console output is streamed to log server via websocket:</p>
      <button onClick={() => console.log({ a: 2, b: [1, 2, 3] })}>
        Log an object
      </button>
      <button onClick={() => console.error({ a: 1, b: [1, 2] })}>
        Log an error
      </button>
      <button onClick={throwError}>Throw exception</button>

      <hr />

      <h1>SCSS and AutoPrefixr</h1>
      <p>Clip-path inside nested CSS classes:</p>
      <div className="outer">
        <div className="inner"></div>
      </div>

      <hr />
    </>
  );
}

export default hot(module)(Demo);

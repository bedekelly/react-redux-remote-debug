import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import RemoteDebug from "./RemoteDebug";
import Counter from "./Counter";

const initialState = {
  count: 0
};

function counter(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT": {
      return { count: state.count + 1 };
    }
    case "DECREMENT": {
      return { count: state.count - 1 };
    }
    default:
      return state;
  }
}

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <RemoteDebug store={store}>
        <Counter />
      </RemoteDebug>
    </Provider>
  );
}

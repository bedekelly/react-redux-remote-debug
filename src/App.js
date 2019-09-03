import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

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

function Counter({ count, increment, decrement }) {
  return (
    <>
      <button onClick={increment}>+</button>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
    </>
  );
}

const store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function mapStateToProps(state) {
  return { count: state.count };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  };
}

let ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  );
}

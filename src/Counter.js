import React from "react";
import { connect } from "react-redux";

function Counter({ count, increment, decrement }) {
  return (
    <>
      <button onClick={increment}>+</button>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
    </>
  );
}

function mapStateToProps(state) {
  return { count: state.count };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

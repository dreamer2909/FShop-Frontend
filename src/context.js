import React from "react";

const globalState = {
  cartQuantity: JSON.parse(localStorage.getItem("items")) ? JSON.parse(localStorage.getItem("items")).length : 0,
};

const globalStateContext = React.createContext(globalState);
const dispatchStateContext = React.createContext(undefined);

const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

export { globalState, globalStateContext, dispatchStateContext, useGlobalState };

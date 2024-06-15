import rootReducers from "./index";
import { configureStore } from "@reduxjs/toolkit";

function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state);
    console.log("luu local storage: ", serialisedState);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = configureStore({
  reducer: rootReducers,
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  console.log("store subscribe: ", store.getState());
  saveToLocalStorage(store.getState());
});

export default store;

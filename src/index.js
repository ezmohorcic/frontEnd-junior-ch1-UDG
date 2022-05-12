import React from "react";
import "./index.css";
import store from "./Redux/store.js";
import { Provider } from "react-redux";
import App from "./App";
import {createRoot} from 'react-dom/client'

const container = document.getElementById("root")
const root = createRoot (container);
root.render(<Provider store={store}> <App /> </Provider>)
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from './context/AuthContext';

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>

     <AuthProvider>
      <App />
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
bodyClassName='toastBody'
/>
      </AuthProvider>

  </React.StrictMode>,
  document.getElementById("root")
);

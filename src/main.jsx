// import React from 'react'
// import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { BrowserRouter as Router } from "react-router-dom";
// import './index.css'

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./home.jsx";
import './index.css'
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>
//   </React.StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/dowellwebsitecrawler",
    element: <App />,
    children: [
      {
        path: "/dowellwebsitecrawler",
        element: <Home />
      }
    ]
  }
])
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);

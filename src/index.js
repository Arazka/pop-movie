import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating max={5} color="yellow" size={50} />
    <StarRating max={10} color="blue" size={70} />
    <StarRating max={15} color="red" size={90} /> */}
  </React.StrictMode>
);

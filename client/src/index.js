import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY, {
  locale: "es",
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);

reportWebVitals();

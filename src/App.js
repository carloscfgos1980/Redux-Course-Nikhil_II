import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";

function App() {
  const cart = useSelector(state => state.cart);
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  // useEffect for fetching an API
  useEffect(() => {
    fetch('https://redux-http-aa16a-default-rtdb.firebaseio.com/cartItems.json', // Given name to the collection we are going to create
      {
        method: "PUT",
        body: JSON.stringify(cart),
      })
  }, [cart])
  return (
    <div className="App">
      {!isLoggIn && <Auth />}
      {isLoggIn && <Layout />}
    </div>
  );
}

export default App;

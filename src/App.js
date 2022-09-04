import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";

function App() {
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);
  console.log(isLoggIn)
  return (
    <div className="App">
      {!isLoggIn && <Auth />}
      {isLoggIn && <Layout />}
    </div>
  );
}

export default App;

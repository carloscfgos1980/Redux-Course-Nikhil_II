import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notificatons";
import { fetchData, sendCartData } from "./store/cart-actions";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  // useEffect for fetching an API

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch])
  return (
    <div className="App">
      {notification && <Notifications type={notification.type} message={notification.message} />}
      {!isLoggIn && <Auth />}
      {isLoggIn && <Layout />}
    </div>
  );
}

export default App;

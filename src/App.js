import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notificatons";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  const cart = useSelector(state => state.cart);
  const isLoggIn = useSelector((state) => state.auth.isLoggIn);

  // useEffect for fetching an API
  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return
    }
    // Send State as Sending request
    dispatch(uiActions.showNotifications({
      open: true,
      message: "Sending request",
      type: 'warning'
    }))
    const sendRequest = async () => {
      const res = await fetch('https://redux-http-aa16a-default-rtdb.firebaseio.com/cartItems.json', // Given name to the collection we are going to create
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // Send ste as the Request is sucessful
      dispatch(uiActions.showNotifications({
        open: true,
        message: "Send request to Data Base successfully",
        type: 'success'
      }))
    }
    sendRequest().catch(err => {
      //Send state as error
      dispatch(uiActions.showNotifications({
        open: true,
        message: "Sending request Failed",
        type: 'error'
      }))

    })
  }, [cart])
  return (
    <div className="App">
      {notification && <Notifications type={notification.type} message={notification.message} />}
      {!isLoggIn && <Auth />}
      {isLoggIn && <Layout />}
    </div>
  );
}

export default App;

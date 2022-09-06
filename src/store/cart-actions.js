import { uiActions } from "./ui-slice";
const API_URL = "https://redux-http-aa16a-default-rtdb.firebaseio.com/cartItems.json";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotifications({
                open: true,
                message: "Sending Request To Database!",
                type: "warning",
            })
        );
        const sendRequest = async () => {
            // Send state as Sending request

            const res = await fetch(
                API_URL,
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );
            const data = await res.json();
            // Send state as Request is successful
            dispatch(
                uiActions.showNotifications({
                    open: true,
                    message: "Request Sent Successfully!!",
                    type: "success",
                })
            );
        };
        try {
            await sendRequest();
        } catch (err) {
            dispatch(
                uiActions.showNotifications({
                    open: true,
                    message: "Sending Request Failed",
                    type: "error",
                })
            );
        }
    };
};
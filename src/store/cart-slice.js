import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // To check if the item is already available
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    name: newItem.name,
                    id: newItem.id,
                    quantity: 1,
                    totalPrice: newItem.price,
                    price: newItem.price
                });
                state.totalQuantity++; // increase the total quantity
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.itemsList.find((item) => item.id === id);
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart; // allows to swith from true to false everytime we call this function. USeful to show the info in the DOM
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
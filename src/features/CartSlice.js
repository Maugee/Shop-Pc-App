import { createSlice } from "@reduxjs/toolkit";
import { calcular_total_price } from "../utils/functions";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: null,
            updateAt: Date.now().toLocaleString()
        }
    },
    reducers: {
        addItem: (state, action)=>{
            const productInCart = state.value.cartItems.find(item=> item.id === action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload)
            }
            else{
                state.value.cartItems.map(item=>{
                    if(item.id === action.payload.id){
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }
            const total = calcular_total_price(state.value.cartItems)

            state.value = {
                ...state.value,
                total,
                updateAt: new Date().toLocaleString()
            }
        },
        removeItem: (state, action)=>{
            state.value.cartItems = state.value.cartItems.filter(item => item.id !== action.payload);
            const total = calcular_total_price(state.value.cartItems); // Recalcular total
            state.value = {
                ...state.value,
                total,
                updateAt: new Date().toLocaleString()
            };
        },
        clearCart: (state)=>{
            state.value.cartItems=[],
            state.value.total=0
        }
    }
})


export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
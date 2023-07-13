import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listItem: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        handleAddItem: (state, action) => {
            console.log(action.payload)
            let isRecur = false
            state.listItem.forEach(item => {
                if (item.name == action.payload.name) {
                    isRecur = true
                    item.quantity += action.payload.quantity
                }
            })
            if (!isRecur) {
                state.listItem = [...state.listItem, action.payload]

            }


        },
        handleChangeQuantity: (state, action) => {

            state.listItem.forEach(item => {
                if (item.name == action.payload.name) {
                    item.quantity = action.payload.quantity
                }
            })


        },
        handleDeleteItem: (state, action) => {

            state.listItem = state.listItem.filter(item => {
                return item.name != action.payload.name
            })

        },

        doOrderSuccess: (state) => {
            state.listItem = []
        }

    },
})

// Action creators are generated for each case reducer function
export const { handleAddItem, handleChangeQuantity, handleDeleteItem, doOrderSuccess } = cartSlice.actions

export default cartSlice.reducer
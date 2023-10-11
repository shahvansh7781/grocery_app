import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem ,removeItem} from "../utils/asyncStorage";



const setAsynccart = async (cartData) => {
  try {
    const stringValue = JSON.stringify(cartData);
    setItem('cart', stringValue);
    
    // Retrieve the stored value to verify if it was stored correctly
    const storedValue = await getItem('cart');
    console.log('Retrieved value:', JSON.parse(storedValue));
  } catch (error) {
    console.log('Error storing value: ', error);
  }
}




const CartSlice = createSlice({
  name: "Cart",
  initialState:[],
 
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      console.log('state',state)
      setAsynccart(state)

    },
    // update:(state,action)=>{
    //     const {id,title,desc}=action.payload
    //     const tf=state.find(todo=>todo.id==id)

    //     if(tf){
    //         tf.title=title
    //         tf.desc=desc
    //     }
    // },

    updateCount: (state, action) => {
      const { id, count } = action.payload;
      const tf = state.find((grocery) => grocery.id == id);

      if (tf) {
        tf.count = count;
      }
      setAsynccart(state)
    },

    deletee: (state, action) => {
      const { id } = action.payload;
      const tf = state.find((grocery) => grocery.id == id);

      if (tf) {
        setAsynccart(state.filter((grocery) => grocery.id !== id))
        return state.filter((grocery) => grocery.id !== id);
      }
    },

    deleteAll: (state) => {
      // Set the state to an empty array to remove all items
      state.splice(0, state.length);
      setAsynccart(state)
    },

    setCartInitialState: (state, action) => {
      // Set the state to the provided initial data
      return action.payload;
    },
  },
});

export const { add,setCartInitialState } = CartSlice.actions;
export const { update, deletee, updateCount ,deleteAll} = CartSlice.actions;
export default CartSlice.reducer;

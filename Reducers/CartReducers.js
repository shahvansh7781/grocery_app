import { createSlice } from "@reduxjs/toolkit";


const CartSlice= createSlice({
    name:"Cart",
    initialState:[
        {
            id: 1,
            image: require('../Admin/Images/shopping-bag.png'),
            price:20,
           
            title: 'Amazing Food Place',
            count:1,
            stock:8,
           
          },
          {
            id: 2,
            image: require('../Admin/Images/shopping-bag.png'),
           
            price:90,
            title: 'Second Amazing Food Place',
            count:1,
            stock:5,
           
          },
          {
            id: 3,
            image: require('../Admin/Images/shopping-bag.png'),
            price:20,
           
            title: 'Amazing Food Place',
            count:1,
            stock:8,
           
          },
          {
            id: 4,
            image: require('../Admin/Images/shopping-bag.png'),
           
            price:90,
            title: 'Second Amazing Food Place',
            count:1,
            stock:5,
           
          },
          
      ],
    reducers:{

        add:(state,action)=>{
            state.push(action.payload)
        },
        // update:(state,action)=>{
        //     const {id,title,desc}=action.payload
        //     const tf=state.find(todo=>todo.id==id)

        //     if(tf){
        //         tf.title=title
        //         tf.desc=desc
        //     }
        // },

        updateCount:(state,action)=>{
            const {id,count}=action.payload
            const tf=state.find(grocery=>grocery.id==id)

            if(tf){
                tf.count=count
            }
            
        },
        
        deletee:(state,action)=>{
            const {id}=action.payload
            const tf=state.find(grocery=>grocery.id==id)

            if(tf){
                return state.filter(grocery=>grocery.id !== id)
            }
        }
    }

    

})

export const {add}=CartSlice.actions
export const {update,deletee,updateCount}=CartSlice.actions
export default CartSlice.reducer
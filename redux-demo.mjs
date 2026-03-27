import {createStore} from 'redux';

const initialState = {
    message: "Hello",
    count: 5
}

//reducer
const reducer = (state = initialState,action) =>{
    if(action.type=== "increment_ctr"){
        return {
            ...state,
            count: state.count+1
        }
    }
    if(action.type=== "update_ctr"){
        return {
            ...state,
            count: action.ctr
        }
    }
    //returning the updated state
    return state;
}

//store creation
const store = createStore(reducer);
console.log("State: ", store.getState());

store.subscribe(()=>{
    console.log("State in subscriber: ", store.getState());
})

store.dispatch({type:'increment_ctr'});
//console.log("State: ", store.getState());
store.dispatch({type:'update_ctr',ctr:10});
//console.log("State: ", store.getState());

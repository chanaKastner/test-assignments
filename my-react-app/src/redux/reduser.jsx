import produce from 'immer';
const InitialState={
    users:[],
}
export const dataReducer = produce((state, action) => {

    switch (action.type) {
     case "GET_USERS":
      debugger
     state.users=action.payload
      break;     

        
     default:
            break;
    }
}, InitialState)
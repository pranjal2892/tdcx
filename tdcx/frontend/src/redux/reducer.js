import { LOGIN, LOGOUT } from "../actionTypes"


const InitialState = {
    userName : "",
    userId: ""
}


export default function LoginReducer(state=InitialState, action){
    switch(action.type){
      case LOGIN :
        console.log(action.payload);
        return {
            userName: action.payload[0].name,
            userId : action.payload[0]._id,
        }
        case LOGOUT :
          return InitialState;
        default:
          return state;
    }
}

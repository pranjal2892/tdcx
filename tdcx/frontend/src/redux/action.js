import { LOGIN, LOGOUT } from "../actionTypes";

export const saveUserData = (data) => {
   return {
        type: LOGIN,
        payload: data
    };
};

export const clearUserData = () => {
    return {
         type: LOGOUT
     };
 };



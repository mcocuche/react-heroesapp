import { types } from "../types/types";

// const initialState = {
//     logged: false,
// }

// export const authReducer = ( state = initialState, action ) => {
export const authReducer = ( state = {}, action ) => {

    switch (action.type) {

        case types.login:
            return {
                ...state, // porque puede tener mas propiedades en el state => desest el state y reemplaza lo q interese
                logged: true,
                user: action.payload,
            };
        
        case types.logout:
            return {
                logged: false,
                // user: null,  o directamente no se pone
            };
    
        default:
            return state;
    }

}
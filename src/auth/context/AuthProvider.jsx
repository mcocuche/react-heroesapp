import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

import { types } from "../types/types";

// const initialState = {
//     logged: false,
// }

// def init --> initializer como 3er args del useReducer
const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );

    return {
        logged: !!user, // !!user => si el user existe va a ser true
        user: user,
    }
}

export const AuthProvider = ({children}) => {
  
    const [ authState, dispatch ] = useReducer( authReducer, {}, init );

    const login = ( name = '' ) => {
        
        const user = {id: 'ABC', name: name,} 
        const action = { type: types.login, payload: user };

        localStorage.setItem('user', JSON.stringify( user ));

        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout };
        dispatch(action);
    }
  
    return (
        // Si no tiene Value puede dejar un obj vacio 
        <AuthContext.Provider value={ {
            ...authState, 
            login: login,
            logout: logout
        } }> 
            {children}
        </AuthContext.Provider>
    )
}

import { authReducer, types } from "../../../src/auth";


describe('Pruebas en AuthReducer', () => { 

    test('Dede retornar el estado por defecto', () => { 
        const state = authReducer( {logged: false}, {}); // args: 1- state, 2- action (obj vacio)
        expect(state).toEqual({logged: false});
    });

    test('Debe llamar el login y autenticar (y establecer) el user', () => { 
        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Juan',
            }
        }
        const state = authReducer({logged: false}, action);
        expect(state).toEqual({
            logged: true,
            user: action.payload,
        });
    });

    test('Debe borrar (logout) el name de user y logged en false', () => { 
        const state = {
            logged: true,
            user: {id: '123',name: 'Juan',}
        }
        const action = {
            type: types.logout
        }
        const newState = authReducer(state, action);
        console.log(newState); //{ logged: false }
        expect(newState).toEqual({ logged: false });
    });

});
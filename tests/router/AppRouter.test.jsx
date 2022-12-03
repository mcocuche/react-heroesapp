import { render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en el <AppRouter/>', () => { 

    test('Debe mostrar el login si no esta autenticado', () => { 
    
        const contextValue = {logged: false}
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>    
            </MemoryRouter>
        );
        // screen.debug();
        // expect(screen.getByText('Login')).toBeTruthy(); NO PASA XQ HAY 2 ELEM 'LOGIN'
        expect(screen.getAllByText('Login').length).toBe(2);
    
    });

    test('Debe mostrar el comp Marvel si esta autenticado', () => { 
    
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan',
            }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>    
            </MemoryRouter>
        );
        // screen.debug();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);

    });

});
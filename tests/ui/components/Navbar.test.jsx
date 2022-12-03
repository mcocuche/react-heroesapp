import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en el <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user: {name: 'Juan'}, 
        logout: jest.fn()
    }
    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar el nombre del user', () => { 
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>    
        );
        // screen.debug();
        expect(screen.getByText('Juan')).toBeTruthy();
    });
    
    test('Debe llamar el logout y navigate al hacer click', () => { 
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>    
        );
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);
        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
        
    });

});
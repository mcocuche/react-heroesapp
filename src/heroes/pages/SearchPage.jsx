import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';

import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    // console.log({location});

    // const query = queryString.parse( location.search );
    const { q = '' } = queryString.parse( location.search ); // { q = '' } si no viene el valor le asigna ''
    // console.log({query});
    // console.log({q});
    const heroes = getHeroesByName(q);

    // Otra forma de mostrar alertas de busqueda:
    const showSearch = ( q.length === 0 ); // true o false
    const showError = ( q.length > 0 ) && ( heroes.length === 0 );

    const { searchText, onInputChange} = useForm({
        searchText: q
    });

    const onSearchSubmit = (event) => {
        event.preventDefault();
        // if (searchText.trim().length <= 1) return; PARA MOSTRAR COMP CONDITIONALMENTE NO ES NECESARIA ESTA CONDICION
        navigate(`?q=${searchText}`)
    }
    
    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>
                    <hr />
                    <form onSubmit={ onSearchSubmit } aria-label="form">
                        <input 
                            type="text" 
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={onInputChange}
                        />

                        <button className="btn btn-outline-primary mt-2">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {/* {
                        ( q === '' )
                          ? <div className="alert alert-primary animate__animated animate__fadeIn">Search a hero</div>
                          : ( heroes.length === 0 )
                            && <div className="alert alert-danger animate__animated animate__fadeIn">No hero with <b>{ q }</b></div>                       
                    }    */}
                    <div className="alert alert-primary animate__animated animate__fadeIn"
                         style={{ display: showSearch ? '' : 'none' }}
                    >
                        Search a hero
                    </div>
                    
                    <div className="alert alert-danger animate__animated animate__fadeIn"
                         aria-label="alert-danger"
                         style={{ display: showError ? '' : 'none' }}
                    >
                        No hero with <b>{ q }</b>
                    </div>                       

                    {
                        heroes.map( heroe => (
                            <HeroCard key={ heroe.id } {...heroe} />
                        ))
                    }

                </div>
            </div>
        </>
    )
}

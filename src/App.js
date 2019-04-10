import React, { useEffect, lazy, Suspense, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import { ajax } from 'rxjs/ajax';
import { from } from 'rxjs';
import { map, tap, concatMap } from 'rxjs/operators'
import queryString from 'query-string';

const Lazy = lazy(() => import('./components/Lazy'));

export const addAPIKey = '?apikey=RazumBPJ4eaAIwerogArgXo3phbCACXI'

const App = () => {

  const initialState = {};

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addCity':
        return {
          ...state,
          [action.payload.city_name]: action.payload
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const citiesArr = ['Raleigh', 'Atlanta', 'Austin'];

  useEffect(() => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily`
    const key = '48c2bf2fe2784be5b96c88095299f29a'
    const units = 'I'

    const getCity = city => ajax.getJSON(`${url}?${queryString.stringify({
      key,
      units,
      city
    })}`)

    from(citiesArr)
      .pipe(
        concatMap(city => getCity(city)))
      .subscribe(
        data => dispatch({
          type: 'addCity',
          payload: data
        }),
        error => console.log(error)
      )
  }, [])

  console.log(state);
  return (
    <div className="App">
      <div>Not Lazy</div>
      <Suspense fallback={<div>Loading</div>}><Lazy /></Suspense>
    </div>
  )
}

export default App;

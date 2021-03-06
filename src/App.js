import React, { useEffect, lazy, Suspense, useReducer } from 'react';
import Modal from 'react-modal';
import './App.css';
import { ajax } from 'rxjs/ajax';
import { from } from 'rxjs';
import { map, tap, concatMap } from 'rxjs/operators'
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import WeatherTable from './components/WeatherTable';
// import WeatherChart from './components/WeatherChart';
const WeatherChart = lazy(() => import('./components/WeatherChart'));

const App = () => {

  const initialState = {
    cities: [],
    selected: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addCity':
        return {
          ...state,
          cities: [
            ...state.cities,
            action.payload
          ]
        }
      case 'setSelected':
        return {
          ...state,
          selected: action.payload
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const citiesArr = ['Raleigh', 'Atlanta', 'Austin', 'Charlottesville', 'Lincoln', 'Stockholm'];

  useEffect(() => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily`
    const key = '48c2bf2fe2784be5b96c88095299f29a'
    const units = 'I'

    const getCity = city =>
      ajax.getJSON(`${url}?${queryString.stringify({
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

  return (
    <div className="App" >
      <WeatherTable cities={state.cities} handler={city => dispatch({
        type: 'setSelected',
        payload: city
      })} />
      {!!state.selected && <Modal isOpen={true} onRequestClose={() => dispatch({
        type: 'setSelected',
        payload: null
      })} appElement={document.getElementById('root')}>
        <Suspense fallback={<Load />}>
          <WeatherChart city={state.selected} />
        </Suspense>
      </Modal>
      }

    </div>
  )
}

const Load =  () => (
  <ReactLoading type="cubes" color="#000000" />
)

export default App;

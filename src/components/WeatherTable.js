import React from 'react'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const WeatherTable = ({ cities, handler }) => {
    return (
        <table css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            width: 600px;
            height: 400px;
            border: 1px solid black;
            margin: -200px 0 0 -300px;
            border-radius: 10px;
            `
        }>
            <thead>
                <tr css={css`
                    font-weight: bold;
                    `}>
                    <th colSpan="2">Weather</th>
                </tr>
            </thead>
            <tbody>
                <tr css={css`
                    font-weight: bold;
                `}>
                    <td>City</td>
                    <td>Current Temperature (F)</td>
                </tr>
                {cities.map(city => {
                    return (
                        <tr css={css`
                            &:hover {
                                background-color: #d3d3d3;
                                cursor: pointer;
                            }`}
                            onClick={() => handler(city)}
                        >
                            <td>{city.city_name}</td>
                            <td>{city.data[0].temp}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    );
}

export default WeatherTable;
import React from 'react';
import { VictoryBar } from 'victory';
import moment from 'moment';
import { css } from '@emotion/core'

const WeatherChart = ({ city }) => {
    const result = city.data.map(day => ({
        x: moment(day.valid_date).format('D'),
        y: day.temp
    }))

    return (
        <>
            <h1 css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
            `}>{city.city_name}</h1>
            <VictoryBar data={result.reverse()} labels={d => d.y}/>
        </>
    )
}

export default WeatherChart;
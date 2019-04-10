import React from 'react';
import Modal from 'react-modal';
import { VictoryBar } from 'victory';
import moment from 'moment';

import { css, jsx } from '@emotion/core'

const WeatherChart = ({ city, handler }) => {

    const result = city.data.map(day => ({
        x: moment(day.valid_date).format('D'),
        y: day.temp
    }))

    return (
        <Modal isOpen={true} onRequestClose={() => handler()}>
            <h1 css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
            `}>{city.city_name}</h1>
            <VictoryBar data={result} labels={d => d.y}/>
        </Modal>
    )
}

export default WeatherChart;
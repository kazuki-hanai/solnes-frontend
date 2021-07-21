import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { SimulatorBoard } from './components/SimulatorBoard';

const wrapperStyle = css`
    width: 800px;
    margin: 0 auto;
`;

type AppProps = {}

const App = ({ }: AppProps) => {
    return (
        <div className={wrapperStyle}>
            <header>
                <h1>Carla simulator dashboard</h1>
            </header>
            <SimulatorBoard />
        </div>
    );
}

export default App;

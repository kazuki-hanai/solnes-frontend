import React, { ReactElement } from 'react';
import { css } from '@emotion/css';
import { Menu } from './components/Menu';
import { MainContent } from './components/MainContent';
import { Search } from './components/Search';

const wrapperStyle = css`
    display: grid;
    grid-template-columns: 20% 50% 30%;
    width: 1200px;
`;


const App = (): ReactElement => {
    return (
        <div className={wrapperStyle}>
            <Menu />
            <MainContent />
            <Search />
        </div>
    );
}

export default App;

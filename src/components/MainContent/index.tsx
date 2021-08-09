import React, { ReactElement } from 'react';
import { css } from '@emotion/css';
import { Home } from './Home';
import { Profile } from './Profile';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/reducers';

const wrapperStyle = css`
    padding: 1rem;
    position: absolute;
    width: 50%;
    margin-left: 22.1%;

    h2 {
        width: 100%;
        padding: 0 0 3rem 0;
        margin: 0;
    }
`;

export const MainContent = (): ReactElement => {
    const { contentState } = useSelector((state: RootState) => state);

    let ContentComponent;
    if (contentState.name == "home") {
        ContentComponent = <Home />
    } else if (contentState.name == "profile") {
        ContentComponent = <Profile />
    }
    return (
        <div className={wrapperStyle}>
            <div>
                {ContentComponent}
            </div>
        </div>
    );
}
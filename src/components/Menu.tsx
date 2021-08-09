import React, { ReactElement } from 'react';
import { css } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import { setContentName } from '../reducers/content';
import type { RootState } from 'src/reducers';

const wrapperStyle = css`
    position: fixed;
    width: 20%;
    height: 100%;
    text-decoration: none;
    text-align: right;
    margin: 0 auto;
    padding: 1rem;
    border-right: 1px solid rgba(184,193,236,0.3);
    color: #7881ac;

    h1 {
        color: #fff;
        margin: 0;
    }
    a {
        text-decoration: none;
        color: #7881ac;
    }
    ul {
        padding-left: 0;

    }
    li {
        list-style: none;
        font-size: 1.5rem;
        margin: 0.8rem 0.5rem;
    }
    li:hover {
        text-decoration: underline;
    }
`;

const SelectedList = css`
    color: #b8c1ec;
    a {
    color: #b8c1ec;
    };
`;

export const Menu = (): ReactElement => {
    const { contentState } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <div className={wrapperStyle}>
            <h1>Solnes</h1>
            {contentState.name == "home" && (
                <ul>
                    <li className={SelectedList} onClick={() => dispatch(setContentName("home"))}><a href="#home" >Home</a></li>
                    <li onClick={() => dispatch(setContentName("profile"))}><a href="#profile" >Profile</a></li>
                </ul>
            )}
            {contentState.name == "profile" && (
                <ul>
                    <li onClick={() => dispatch(setContentName("home"))}><a href="#home" >Home</a></li>
                    <li className={SelectedList} onClick={() => dispatch(setContentName("profile"))}><a href="#profile" >Profile</a></li>
                </ul>
            )}
        </div>
    );
}
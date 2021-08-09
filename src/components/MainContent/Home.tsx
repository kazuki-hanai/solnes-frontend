import React, { ReactElement } from 'react';
import { css } from '@emotion/css';

const wrapperStyle = css`
`;

const posts = [
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "ゆーこちゃーん",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "こんにちは！",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "Hello from Solana",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "ゆーこちゃーん",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "こんにちは！",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "Hello from Solana",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "ゆーこちゃーん",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "こんにちは！",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "Hello from Solana",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "ゆーこちゃーん",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "こんにちは！",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
    {
        "screenName": "wan-nyan-wan",
        "profileImage": "https://wan-nyan-wan.github.io/icon.png",
        "post": "Hello from Solana",
    },
    {
        "screenName": "Yuko chan",
        "profileImage": "https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png",
        "post": "ゆーこです(^_^)",
    },
]

const PostStyle = css`
    display: flex;
    width: 91%;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(184,193,236,0.3);
    img {
        width: 70px;
    }
`;

export const Home = (): ReactElement => {
    const postElements = [];
    for (const item of posts) {
        postElements.push((<div className={PostStyle}>
            <div className={css`
            `}>
                <img src={item.profileImage} alt="" />
            </div>
            <div className={css`
                display: flex;
                flex-direction: column;
            `}>
                <h2>{item.screenName}</h2>
                <p>{item.post}</p>
            </div>
        </div >))
    }
    return (
        <div className={wrapperStyle}>
            {postElements}
        </div>
    );
}
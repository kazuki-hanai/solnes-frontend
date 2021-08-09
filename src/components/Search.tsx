import React, { ReactElement, useState } from 'react';
import { css } from '@emotion/css';
import { getAccountData } from '../solnes/utils';
import { Connection, PublicKey } from '@solana/web3.js';

const wrapperStyle = css`
    position: fixed;
    width: 30%;
    height: 100%;
    margin-left: 70%;
    border-left: 1px solid rgba(184,193,236,0.3);
    padding: 1rem;

    input {
        width: 80%;
    }

`;

const otherCardStyle = css`
    display: flex;
    align-items: center;
    color: #232946;
    font-size: 1.6rem;
    width: 70%;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    margin: 0.5rem;

    img {
        width: 50px;
    }
`;


export const Search = (): ReactElement => {
    const [text, setText] = useState("");

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        // const userPubkey = e.target.value;
        // const rpcUrl = 'http://localhost:8899';
        // const connection = new Connection(rpcUrl, 'confirmed');
        // const accountData = await getAccountData(connection, new PublicKey(userPubkey));
        // console.log(accountData);
    }

    return (
        <div className={wrapperStyle}>
            <input type="text" name="" placeholder="Search pubkey" onChange={handleSearch}></input>
            {text.length > 10 &&
                <div className={otherCardStyle}>
                    <img src="https://1.bp.blogspot.com/-lHRPkB0jHpo/X9lJaJuPoII/AAAAAAABc4s/8N-scv9VYy8F5tSfeT_j3Fwr_i576o3qwCNcBGAsYHQ/s180-c/kutsuhimo_musubu_woman.png"></img>
                    <p>Yuko chan</p>
                </div>
            }
        </div>
    );
}

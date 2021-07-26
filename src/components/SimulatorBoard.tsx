import React, { useState, useEffect, ReactNode, useRef } from 'react';
import Select, { ActionMeta } from 'react-select'
import { css } from '@emotion/css'

const bestTrStyle = css`
    background-color: #f9f;
`
const selectStyle = css`
    width: 200px;
    margin: 1rem;
`;

const tableStyle = css`
    margin: 1rem;
`;

const buttonStyle = css`
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
    padding: 1rem 2rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    width: 300px;
    &:hover {
        background-color: #008CBA;
        color: white;
    };
`

type Props = {}

const options = [...Array(12).keys()].map(i => ({ value: `${i + 1}`, label: `${i + 1}` }));

export const SimulatorBoard = ({ }: Props) => {
    const [simulatorNum, setSimulatorNum] = useState(options[0].value);
    const [selectedInstance, setSelectedInstance] = useState("");
    const [instanceList, setInstanceList] = useState<ReactNode[]>([]);
    const [ipAddress, setIpAddress] = useState("");
    const [createInstanceOutput, setCreateInstanceOutput] = useState("");
    const [launchServerOutput, setLaunchServerOutput] = useState("");
    const createInstanceOutputElement = useRef<HTMLParagraphElement>(null);
    const launchServerOutputElement = useRef<HTMLParagraphElement>(null);

    const fetchAndSetInstanceList = async (simulatorNum: string) => {
        const res = await fetch(`http://192.168.23.117:8000/instance_cost/${simulatorNum}`);
        const json = await res.json();
        let list: ReactNode[] = [];
        for (let i = 0; i < json["instances"].length; i++) {
            if (json["best"]["instance"] == json["instances"][i]["instance"]) {
                setSelectedInstance(json["instances"][i]["instance"]);
                list.push(<tr className={bestTrStyle}>
                    <td>{json["instances"][i]["instance"]}</td>
                    <td>{json["instances"][i]["cost"]}</td>
                </tr>)
            } else {
                list.push(<tr>
                    <td>{json["instances"][i]["instance"]}</td>
                    <td>{json["instances"][i]["cost"]}</td>
                </tr >)
            }
        }
        setInstanceList(list);
    };

    useEffect(() => {
        if (createInstanceOutputElement.current !== null)
            createInstanceOutputElement.current.scrollTop = createInstanceOutputElement.current.scrollHeight;
    }, [createInstanceOutput]);

    useEffect(() => {
        if (launchServerOutputElement.current !== null)
            launchServerOutputElement.current.scrollTop = launchServerOutputElement.current.scrollHeight;
    }, [launchServerOutput]);

    const createInstanceHandler = async () => {
        const websocket = new WebSocket(`ws://192.168.23.117:8000/create_instance/${selectedInstance}/ws`);

        let output = createInstanceOutput;
        websocket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            output += msg["msg"] + '\n'
            setCreateInstanceOutput(output);
        };
        websocket.onerror = (err) => {
            console.log(err);
            output += err + '\n';
        };
    }

    const launchServerHandler = async () => {
        const websocket = new WebSocket(`ws://192.168.23.117:8000/launch_server/${ipAddress}/ws`);

        let output = launchServerOutput;
        websocket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            output += msg["msg"] + '\n'
            setLaunchServerOutput(output);
        };
        websocket.onerror = (err) => {
            console.log(err);
            output += err + '\n';
        };
    }

    useEffect(() => {
        fetchAndSetInstanceList(simulatorNum).catch(err => console.log(err));
    }, [simulatorNum]);

    return (
        <div>
            <div className={css``}>
                <p>1. 立ち上げるインスタンスタイプとインスタンスの数を入力し、下のボタンを押してインスタンスを立ち上げます</p>
                <p className={css`text-align: left;`}>
                    <input className={css``} value={selectedInstance} onChange={(e) => { setSelectedInstance(e.target.value) }}></input>
                    を
                    <input className={css``} value={simulatorNum} placeholder="1~12の数を入力してください" onChange={(e) => { setSimulatorNum(e.target.value) }}></input>
                    台立ち上げます
                </p>
                <table className={tableStyle}>
                    <thead>
                        <td>インスタンス名</td>
                        <td>予測コスト(ドル)</td>
                    </thead>
                    {instanceList}
                </table>
                <input type="button" value="インスタンスを立ち上げる" className={buttonStyle} onClick={createInstanceHandler} />
                <p ref={createInstanceOutputElement} className={css`
                    padding: 1rem; margin: 1rem; background-color: #333; color: white;
                    white-space: pre-line; height: 300px; overflow: scroll;`}
                >{createInstanceOutput}</p>
            </div>
            <div className={css``}>
                <p>2. IPアドレスを入力してCarlaサーバとクライアントを立ち上げます(サーバの立ち上げには時間がかかります）</p>
                <p className={css`text-align: left;`}>
                    IPアドレス: <input className={css``} value={ipAddress} onChange={(e) => { setIpAddress(e.target.value) }}></input>
                </p>
                <input type="button" value="サーバを立ち上げる" className={buttonStyle} onClick={launchServerHandler} />
                <p ref={launchServerOutputElement} className={css`
                    padding: 1rem; margin: 1rem; background-color: #333; color: white;
                    white-space: pre-line; height: 300px; overflow: scroll;`}
                >{launchServerOutput}</p>
            </div>
        </div>
    );
}
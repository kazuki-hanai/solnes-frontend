import React, { useState, useEffect, ReactNode } from 'react';
import Select, { ActionMeta } from 'react-select'
import { css } from '@emotion/css'

const bestTrStyle = css`
background-color: #f9f;
`

type Props = {}

const options = [...Array(12).keys()].map(i => ({ value: `${i + 1}`, label: `${i + 1}` }));

export const SimulatorBoard = ({ }: Props) => {
    const [simulatorNum, setSimulatorNum] = useState(options[0].value);
    const [instanceList, setInstanceList] = useState<ReactNode[]>([]);

    const changeInstanceNum = async (
        newValue: any,
        actionMeta: any
    ) => {
        setSimulatorNum(newValue.value);
        const res = await fetch(`http://192.168.23.117:8000/instance_cost/${newValue.value}`);
        const json = await res.json();
        let list: ReactNode[] = [];
        for (let i = 0; i < json["instances"].length; i++) {
            if (json["best"]["instance"] == json["instances"][i]["instance"]) {
                list.push(<tr className={bestTrStyle}>
                    <td>{json["instances"][i]["instance"]}</td>
                    <td>{json["instances"][i]["cost"]}</td>
                </tr>)
            } else {
                list.push(<tr>
                    <td>{json["instances"][i]["instance"]}</td>
                    <td>{json["instances"][i]["cost"]}</td>
                </tr>)
            }
        }
        setInstanceList(list);
    };
    return (
        <div>
            <div>
                シミュレータ数:
                <Select options={options} defaultValue={options[0]} onChange={changeInstanceNum} />
            </div>
            <table>
                <tr>
                    <td>インスタンス名</td>
                    <td>予測コスト</td>
                </tr>
                {instanceList}
            </table>
        </div >
    );
}
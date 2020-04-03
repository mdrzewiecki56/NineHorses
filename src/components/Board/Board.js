import React from 'react';
import Field from '../Field/Field';
import {chunkArray} from '../../Helper';
import './Board.scss';

function Board(props) {
    //VALIDATE BOARD SIZE
    let size;
    if (props.size === undefined || props.size < 5 || props.size %2!==1) {
        console.log("Invalid board size!!")
        size = 9
    } else {
        size = props.size;
    }

    //BOARD CREATION
    let dimension = size*size;
    
    let createBoard = (dimension) => {
        let i,j;
        for (let k = 0; k < dimension; k++) {
            // Calculate Indexes
            i = Math.ceil((k + 1) / size);
            j = (k + 1) % size;
            if (j === 0) j = size;
        }
        let fields = [];
        for (let l=0;l<i;l++){
            for (let m=0;m<j;m++) {
                fields.push(<Field row={l} column={m} key={`${l}:${m}`}/>)
            }
        }

        return chunkArray(fields,size);
    }

    let board = createBoard(dimension).map((columns,index) => 
        <div className="row" key={`column${index}`}>{columns}</div>);

    //RENDERER
    return (
        <div className="Board">
            {board}
        </div>
    );
}

export default Board;

import React, { useState } from 'react';
import Field from '../Field/Field';
import { chunkArray } from '../../Helper';
import './Board.scss';

var CUR_PLAYER_W = 0;
var CUR_PLAYER_B = 1;

function Board(props) {
  // STATUS VARIABLES
  // White by default as white always starts
  const [currentPlayer, setCurrentPlayer] = useState(CUR_PLAYER_W);
  // Field from which player wants to make a move
  const [selectedField, setSelectedField] = useState(null);

  //VALIDATE BOARD SIZE
  let size;
  // Board size must be greater than 5 and odd-sized
  if (props.size === undefined || props.size < 5 || props.size % 2 !== 1) {
    console.log('Invalid board size!!');
    size = 9;
  } else {
    size = props.size;
  }

  //BOARD CREATION
  let dimension = size * size;

  let createBoard = (dimension) => {
    let i, j;
    for (let k = 0; k < dimension; k++) {
      // Calculate Indexes
      i = Math.ceil((k + 1) / size);
      j = (k + 1) % size;
      if (j === 0) j = size;
    }
    let fields = [];
    for (let l = 0; l < i; l++) {
      for (let m = 0; m < j; m++) {
        fields.push(<Field row={l} column={m} key={`${l}:${m}`} />);
      }
    }

    return chunkArray(fields, size);
  };

  let board = createBoard(dimension).map((columns, index) => (
    <div className='row' key={`column${index}`}>
      {columns}
    </div>
  ));

  //RENDERER
  return <div className='Board'>{board}</div>;
}

export default Board;

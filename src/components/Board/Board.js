import React, { useState, useEffect } from 'react';
import Field from '../Field/Field';
import { chunkArray } from '../../Helper';
import Horse from '../Horse/Horse';
import './Board.scss';

const CUR_PLAYER_W = 0;
const CUR_PLAYER_B = 1;

function Board(props) {
  //VALIDATE BOARD SIZE
  let size;
  // Board size must be greater than 5 and odd-sized
  if (props.size === undefined || props.size < 5 || props.size % 2 !== 1) {
    console.log('Invalid board size!!');
    size = 9;
  } else {
    size = props.size;
  }

  // STATUS VARIABLES
  // White by default as white always starts
  const [currentPlayer, setCurrentPlayer] = useState(CUR_PLAYER_W);
  // Field from which player wants to make a move
  const [selectedField, setSelectedField] = useState(null);

  // Horse positions
  const [horsePositions, setHorsePositions] = useState(
    Horse.getInitialHorsesPositions(size)
  );

  //BOARD CREATION
  let dimension = size * size;

  const selectField = (id, horseMode) => {
    if (currentPlayer === horseMode) {
      setSelectedField(id);
    } else if (horseMode) {
      console.log('Not your turn!');
    }
  };

  const createBoard = (dimension) => {
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
        let classList;
        let id = `${l}:${m}`;
        let isHorsePresent = horsePositions.find(
          (horse) => horse.i === l && horse.j === m
        );
        if (isHorsePresent) {
          classList = isHorsePresent.getClassList();
        }
        if (id === selectedField) {
          classList += ' selected';
        }
        if (
          l === Math.ceil((size - 1) / 2) &&
          m === Math.ceil((size - 1) / 2)
        ) {
          fields.push(
            <Field
              row={l}
              column={m}
              key={id}
              id={id}
              isCenter={true}
              Horse={isHorsePresent}
              classList={classList}
              select={selectField}
            />
          );
        } else {
          fields.push(
            <Field
              row={l}
              column={m}
              key={id}
              id={id}
              isCenter={false}
              Horse={isHorsePresent}
              classList={classList}
              select={selectField}
            />
          );
        }
      }
    }

    return chunkArray(fields, size);
  };

  useEffect(() => {}, []);

  let board = createBoard(dimension).map((columns, index) => (
    <div className='row' key={`column${index}`}>
      {columns}
    </div>
  ));

  //RENDERER
  return <div className='Board'>{board}</div>;
}

export default Board;

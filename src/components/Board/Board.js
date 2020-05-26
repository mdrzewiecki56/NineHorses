import React, { useState, useEffect } from "react";
import Field from "../Field/Field";
import { chunkArray } from "../../Helper";
import Horse from "../../Horse/Horse";
import "./Board.scss";

const CUR_PLAYER_W = 0;
const CUR_PLAYER_B = 1;

function Board(props) {
  //VALIDATE BOARD SIZE
  let size;
  // Board size must be greater than 5 and odd-sized
  if (props.size === undefined || props.size < 5 || props.size % 2 !== 1) {
    console.log("Invalid board size!!");
    size = 9;
  } else {
    size = props.size;
  }

  // STATUS VARIABLES
  // White by default as white always starts
  const [currentPlayer, setCurrentPlayer] = useState(CUR_PLAYER_W);
  // Pawn from which player wants to make a move
  const [selectedPawn, setSelectedPawn] = useState({
    i: null,
    j: null,
    mode: null
  });
  // Determines if we have a winner
  const [winner, setWinner] = useState(null);

  // Horse positions
  const [pawnPositions, setPawnPositions] = useState(
    Horse.getInitialHorsesPositions(size)
  );

  //BOARD CREATION
  let dimension = size * size;

  const selectField = (position, pawn) => {
    if (pawn) {
      if (currentPlayer === pawn.mode) {
        setSelectedPawn(pawn);
      } else {
        performBeating(position);
      }
    } else {
      makeMove(position);
    }
  };

  const makeMove = position => {
    if (
      currentPlayer === selectedPawn.mode &&
      Horse.validateMove({ i: selectedPawn.i, j: selectedPawn.j }, position)
    ) {
      const newPositions = pawnPositions.map(pawn =>
        pawn.i === selectedPawn.i && pawn.j === selectedPawn.j
          ? new Horse(position.i, position.j, currentPlayer)
          : pawn
      );
      setPawnPositions(newPositions);
      setSelectedPawn(new Horse(null, null, null));
      //CHANGE TURN
      if (currentPlayer === CUR_PLAYER_W) {
        setCurrentPlayer(CUR_PLAYER_B);
      } else {
        setCurrentPlayer(CUR_PLAYER_W);
      }
      //CHECK IF WHITE WON
      if (
        !newPositions.find(pawn => pawn.mode === 1) ||
        newPositions.find(
          pawn =>
            pawn.mode === 0 &&
            pawn.i === Math.ceil((size - 1) / 2) &&
            pawn.j === Math.ceil((size - 1) / 2)
        )
      ) {
        setWinner(0);
      }
      //CHECK IF BLACK WON
      if (
        !pawnPositions.find(pawn => pawn.mode === 0) ||
        pawnPositions.find(
          pawn =>
            pawn.mode === 1 &&
            pawn.i === Math.ceil((size - 1) / 2) &&
            pawn.j === Math.ceil((size - 1) / 2)
        )
      ) {
        setWinner(1);
      }
    } else if (selectedPawn) {
      console.log("Not your turn or unproper move Sir");
    }
  };

  const performBeating = position => {
    if (
      !Horse.validateMove({ i: selectedPawn.i, j: selectedPawn.j }, position)
    ) {
      return;
    }
    const pawnToBeat = pawnPositions.findIndex(
      pawn => pawn.i === position.i && pawn.j === position.j
    );
    pawnPositions.splice(pawnToBeat, 1);
    setPawnPositions([...pawnPositions]);
    makeMove(position);
  };

  const createBoard = dimension => {
    let i, j;
    for (let k = 0; k < dimension; k++) {
      // Calculate Indexes
      i = Math.ceil((k + 1) / size);
      j = (k + 1) % size;
      if (j === 0) j = size;
    }
    let Fields = [];
    for (let l = 0; l < i; l++) {
      for (let m = 0; m < j; m++) {
        let classList;
        let position = { i: l, j: m };
        let pawn = pawnPositions.find(pawn => pawn.i === l && pawn.j === m);
        if (pawn) {
          classList = pawn.getClassList();
        }
        if (position.i === selectedPawn.i && position.j === selectedPawn.j) {
          classList += " selected";
        }
        if (
          l === Math.ceil((size - 1) / 2) &&
          m === Math.ceil((size - 1) / 2)
        ) {
          Fields.push(
            <Field
              row={l}
              column={m}
              key={`${position.i}:${position.j}`}
              position={position}
              isCenter={true}
              pawn={pawn}
              classList={classList}
              select={selectField}
            />
          );
        } else {
          Fields.push(
            <Field
              row={l}
              column={m}
              key={`${position.i}:${position.j}`}
              position={position}
              isCenter={false}
              pawn={pawn}
              classList={classList}
              select={selectField}
            />
          );
        }
      }
    }

    return chunkArray(Fields, size);
  };

  useEffect(() => {}, []);

  let board = createBoard(dimension).map((columns, index) => (
    <div className="row" key={`column${index}`}>
      {columns}
    </div>
  ));

  //RENDERER
  return (
    <div className="Board">
      {board}
      {winner === 0 && <h1>Player WHITE won!</h1>}
      {winner === 1 && <h1>Player BLACK won!</h1>}
    </div>
  );
}

export default Board;

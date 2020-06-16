export default class AI {    
    _pawnGroups = {
        0: [
            {i: 0, j : 0},
            {i: 0, j : 8},
            {i: 2, j : 2},
            {i: 2, j : 6},
            {i: 6, j : 2},
            {i: 6, j : 6},
            {i: 8, j : 0},
            {i: 8, j : 8},
        ],
        1: [
            {i: 0, j : 1},
            {i: 0, j : 3},
            {i: 0, j : 5},
            {i: 0, j : 7},
            {i: 1, j : 0},
            {i: 1, j : 2},
            {i: 1, j : 4},
            {i: 1, j : 6},
            {i: 1, j : 8},
            {i: 2, j : 1},
            {i: 2, j : 7},
            {i: 3, j : 0},
            {i: 3, j : 4},
            {i: 3, j : 8},
            {i: 4, j : 1},
            {i: 4, j : 3},
            {i: 4, j : 5},
            {i: 4, j : 7},
            {i: 5, j : 0},
            {i: 5, j : 4},
            {i: 5, j : 8},
            {i: 6, j : 1},
            {i: 6, j : 7},
            {i: 8, j : 1},
            {i: 8, j : 3},
            {i: 8, j : 5},
            {i: 8, j : 7},
            {i: 7, j : 0},
            {i: 7, j : 2},
            {i: 7, j : 4},
            {i: 7, j : 6},
            {i: 7, j : 8}
        ],
        2: [
            {i: 0, j : 2},
            {i: 0, j : 4},
            {i: 0, j : 6},
            {i: 1, j : 1},
            {i: 1, j : 3},
            {i: 1, j : 5},
            {i: 1, j : 7},
            {i: 2, j : 0},
            {i: 2, j : 4},
            {i: 2, j : 8},
            {i: 3, j : 1},
            {i: 3, j : 3},
            {i: 3, j : 5},
            {i: 3, j : 7},
            {i: 4, j : 0},
            {i: 4, j : 2},
            {i: 4, j : 6},
            {i: 4, j : 8},
            {i: 8, j : 2},
            {i: 8, j : 4},
            {i: 8, j : 6},
            {i: 7, j : 1},
            {i: 7, j : 3},
            {i: 7, j : 5},
            {i: 7, j : 7},
            {i: 6, j : 0},
            {i: 6, j : 4},
            {i: 6, j : 8},
            {i: 5, j : 1},
            {i: 5, j : 3},
            {i: 5, j : 5},
            {i: 5, j : 7}
        ],
        3: [
            {i: 2, j : 3},
            {i: 2, j : 5},
            {i: 3, j : 2},
            {i: 3, j : 6},
            {i: 5, j : 2},
            {i: 5, j : 6},
            {i: 6, j : 3},
            {i: 6, j : 5}
        ],
        4: [
            {i: 4, j: 4}
        ]
    };

    _pawnGroupValue = {
        0: 3,
        1: 7,
        2: 15,
        3: 25,
        4: 100
    };

    /**
     * Method that return value for given state
     * Black pawns are going to add value
     * White pawns are going to substract value
     */
    _calculateScore(pawnPositions, mode = 1) {
        var self = this;

        const whitePawns = pawnPositions.filter(pawn => {
            return pawn.mode === 0;
        });

        const blackPawns = pawnPositions.filter(pawn => {
            return pawn.mode === 1;
        });

        let whitePawnsScore = 0;
        whitePawns.forEach(pawn => {
            whitePawnsScore += self._getPositionScore(pawn.i, pawn.j)
        });

        let blackPawnsScore = 0;
        blackPawns.forEach(pawn => {
            blackPawnsScore += self._getPositionScore(pawn.i, pawn.j)
        });

        return (mode === 1)? blackPawnsScore - whitePawnsScore: whitePawns - blackPawns;
    }
    
    _getPositionScore(i, j) {
        var group;

        for(let [key, value] of Object.entries(this._pawnGroups)) {
            if(value.find(pos => {
                return pos.i === i && pos.j === j;
            })) {
                group = key;
                break;
            }
        }

       return this._pawnGroupValue[group];
    }

    /**
     * Method that retuns all possible moves 
     * @param {int} i 
     * @param {int} j 
     * @returns {array[objects]} eg. [{i, j}, {i, j}]
     */
    _getPossibleMoves(i, j, yourPawnPositions) {
        let possibleMoves = [];

        for(let y = -2; y <= 2; y+=4) {
            for(let x = -1; x <= 1; x+=2) {
                let pos = {
                    i: i + y,
                    j: j + x
                };

                if(pos.i <= 8 && pos.i >= 0 && pos.j <= 8 && pos.j >= 0) {
                    if(!yourPawnPositions.find(pawn => {
                        return pawn.i === pos.i && pawn.j === pos.j
                    })) {
                        possibleMoves.push(pos);
                    }
                }
            }
        }

        for(let x = -2; x <= 2; x+=4) {
            for(let y = -1; y <= 1; y+=2) {
                let pos = {
                    i: i + y,
                    j: j + x
                };

                if(pos.i <= 8 && pos.i >= 0 && pos.j <= 8 && pos.j >= 0) {
                    if(!yourPawnPositions.find(pawn => {
                        return pawn.i === pos.i && pawn.j === pos.j
                    })) {
                        possibleMoves.push(pos);
                    }
                }
            }
        }

        return possibleMoves;
    }

    getBestMove(pawnPositions) {
        var move = this._minMax(1, pawnPositions, 0);
        return move;
    }

    /**
     * 
     * @param {int} depth how many your moves ahead you want to predict, eg. if you set it to 0, it will only count current state, if you set it to 1, it will predict your move based on the move after enemy move
     * @param {array[object]} all pawns
     * @param {int} if 0 - your pawn are white, if 1 - your pawns are black
     * @returns {object} eg. {i, j}
     */
    _minMax(depth, pawnsPositons, mode, movedOutOfMiddle = false) {
        var self = this;

        if(depth === 0) {   
            if(movedOutOfMiddle) {
                return {
                    score: (mode === 1)? 9999: -9999
                }
            } else {
                return {
                    score: self._calculateScore(pawnsPositons)
                }
            }
        } else {
            let allBestMoves = [];

            let yourPawns = pawnsPositons.filter(pawn => {
                return pawn.mode !== mode;
            });

            let enemyPawns = pawnsPositons.filter(pawn => {
                return pawn.mode === mode;
            });

            yourPawns.forEach((pawn) => {
                let givenMoves = [];

                let possibleMoves = self._getPossibleMoves(pawn.i, pawn.j, yourPawns);

                possibleMoves.forEach(move => {
                    let yourPawnsCopy = [...yourPawns];
                    let enemyPawnsCopy = [...enemyPawns];

                    let beatenEnemyPawnId = enemyPawnsCopy.findIndex(pawn => {
                        return move.i === pawn.i && move.j === pawn.j;
                    });

                    if(beatenEnemyPawnId !== -1) {
                        enemyPawnsCopy.splice(beatenEnemyPawnId, 1);
                    }

                    let currentAllPawns = yourPawnsCopy.concat(enemyPawnsCopy);

                    var movedFromMiddle = movedOutOfMiddle? true: (pawn.i === 4 && pawn.j === 4);

                    var bestMove = self._minMax(depth - 1, currentAllPawns, (mode === 1) ? 0: 1, movedFromMiddle);

                    givenMoves.push({
                        move,
                        from: {
                            i: pawn.i,
                            j: pawn.j
                        },
                        score: bestMove.score
                    })
                });


                if(mode === 1) {
                    givenMoves.sort((a, b) => (a.score > b.score)? 1: -1);
                } else {
                    givenMoves.sort((a, b) => (a.score < b.score)? 1: -1);
                }

                let bestMoves = givenMoves.filter((move) => {
                    return move.score === givenMoves[0].score;
                });
                // Add random best move to array
                allBestMoves.push(bestMoves[Math.floor(Math.random() * bestMoves.length)]);
            });
            
            if(mode === 1) {
                allBestMoves.sort((a, b) => (a.score < b.score)? 1: -1);
            } else {
                allBestMoves.sort((a, b) => (a.score > b.score)? 1: -1);
            }

            allBestMoves = allBestMoves.filter((move) => {
                return move.score === allBestMoves[0].score;
            });

            let bestMove = allBestMoves[Math.floor(Math.random() * allBestMoves.length)];
        
            console.log(bestMove.score);

            return {
                score: bestMove.score,
                from: bestMove.from,
                move: bestMove.move
            };
        }
    }
}
export default class AI {
  static calculateValue(field, pawnPositions) {
    let value = 0;
    // SET VALUES TO ZERO FOR FIELDS WHERE ALREADY IS A BLACK PAWN
    if (
      pawnPositions.find(
        position =>
          position.i === field.i &&
          position.j === field.j &&
          position.mode === 1
      )
    )
      return 0;
    //IF IM ON CENTER THEN MOST IMPORTANT TO LEAVE
    if (
      pawnPositions.find(
        position => position.i === 4 && position.j === 4 && position.mode === 1
      ) &&
      (((field.i === 3 || field.i === 5) && field.j === 2) ||
        ((field.i === 3 || field.i === 5) && field.j === 6))
    ) {
      return 200;
    }
    if (field.i === 4 && field.j === 4) {
      //VALUE FOR CENTER
      value += 50;
      //IF THERE'S OPPONENT ON CENTER
      if (
        pawnPositions.find(
          position =>
            position.i === 4 && position.j === 4 && position.mode === 0
        )
      ) {
        value += 100;
      }
      return value;
    }

    //VALUE FOR FIELD FROM WHICH NEXT MOVE COULD BE MADE TO CENTER
    if (
      ((field.i === 3 || field.i === 5) && field.j === 2) ||
      ((field.i === 3 || field.i === 5) && field.j === 6)
    ) {
      value += 25;
      //IF THERE'S OPPONENT THERE
      if (
        pawnPositions.find(
          position =>
            (((field.i === 3 || field.i === 5) && field.j === 2) ||
              ((field.i === 3 || field.i === 5) && field.j === 6)) &&
            position.mode === 0
        )
      ) {
        value += 12;
      }
      return value;
    }
    if ([2, 4, 6].includes(field.i) && [0, 4, 8].includes(field.j)) {
      value += 12;
      if (
        pawnPositions.find(
          position =>
            [2, 4, 6].includes(position.i) &&
            [0, 4, 8].includes(position.j) &&
            position.mode === 0
        )
      ) {
        value += 6;
      }
      return value;
    }
    if ([1, 7].includes(field.i) && [2, 6].includes(field.j)) {
      value += 6;
      if (
        pawnPositions.find(
          position =>
            [0, 8].includes(position.i) &&
            [0, 8].includes(position.j) &&
            position.mode === 0
        )
      ) {
        value += 3;
      }
      return value;
    }
    if ([0, 8].includes(field.i) && [0, 8].includes(field.j)) {
      value += 3;
      if (
        pawnPositions.find(
          position =>
            [0, 8].includes(position.i) &&
            [0, 8].includes(position.j) &&
            position.mode === 0
        )
      ) {
        value += 1;
      }
      return value;
    }

    return 2;
  }
  //TODO: Model for certain moves depending how close they are to center
  //TODO: Model for additional points depended on beating pawn postision
  //TODO: IF Center then most important is to leave the field

  static makeDecision(fieldsWithValues) {
    return AI.minimax(0, 0, true, fieldsWithValues, 2, 200);
  }
  // values {from, to:[{},{}]}
  static minimax(
    depth,
    nodeIndex,
    maximizingPlayer,
    possibilities,
    alpha,
    beta
  ) {
    const MIN = 2;
    const MAX = 200;
    console.log(possibilities[nodeIndex]);
    if (depth === 4) return possibilities[nodeIndex];

    if (maximizingPlayer) {
      let best = MIN;
      for (let i = 0; i <= 2; i++) {
        let val = AI.minimax(
          depth + 1,
          nodeIndex * 2 + i,
          false,
          possibilities,
          alpha,
          beta
        );
        if (Math.max(best, val.value) === val.value) best = val;
        else best = best;
        if (Math.max(alpha, best) === best.value) alpha = best;
        else alpha = alpha;

        if (beta <= alpha) break;
      }
      return possibilities[nodeIndex];
    } else {
      let best = MAX;
      for (let i = 0; i <= 2; i++) {
        let val = AI.minimax(
          depth + 1,
          nodeIndex * 2 + i,
          true,
          possibilities,
          alpha,
          beta
        );
        best = Math.min(best, val.value);
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
      return possibilities[nodeIndex];
    }
  }
}

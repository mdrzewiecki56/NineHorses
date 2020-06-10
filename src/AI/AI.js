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
    ) {
      return 0;
    }
    //IF IM ON CENTER THEN MOST IMPORTANT TO LEAVE
    if (
      pawnPositions.find(
        position => position.i === 4 && position.j === 4 && position.mode === 1
      ) &&
      (((field.i === 2 || field.i === 6) && field.j === 3) ||
        ((field.i === 2 || field.i === 6) && field.j === 5))
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
      ((field.i === 2 || field.i === 6) && field.j === 3) ||
      ((field.i === 2 || field.i === 6) && field.j === 5)
    ) {
      value += 25;
      //IF THERE'S OPPONENT THERE
      if (
        pawnPositions.find(
          position =>
            (((field.i === 2 || field.i === 6) && field.j === 3) ||
              ((field.i === 2 || field.i === 6) && field.j === 5)) &&
            position.mode === 0
        )
      ) {
        value += 12;
      }
      return value;
    }
    if ([2, 4, 6].includes(field.j) && [0, 4, 8].includes(field.i)) {
      value += 12;
      if (
        pawnPositions.find(
          position =>
            [2, 4, 6].includes(position.j) &&
            [0, 4, 8].includes(position.i) &&
            position.mode === 0
        )
      ) {
        value += 6;
      }
      return value;
    }
    if ([1, 7].includes(field.j) && [2, 6].includes(field.i)) {
      value += 6;
      if (
        pawnPositions.find(
          position =>
            [0, 8].includes(position.j) &&
            [0, 8].includes(position.i) &&
            position.mode === 0
        )
      ) {
        value += 3;
      }
      return value;
    }
    if ([0, 8].includes(field.j) && [0, 8].includes(field.i)) {
      value += 3;
      if (
        pawnPositions.find(
          position =>
            [0, 8].includes(position.j) &&
            [0, 8].includes(position.i) &&
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
    const decision = AI.minimax(
      0,
      0,
      true,
      fieldsWithValues,
      { value: Number.NEGATIVE_INFINITY },
      { value: Number.POSITIVE_INFINITY }
    );
    return decision;
  }
  // values {from, to:[{},{}]}
  static minimax(depth, nodeIndex, maximizingPlayer, values, alpha, beta) {
    if (depth === 2) return values[nodeIndex];

    if (maximizingPlayer) {
      let best = { value: Number.NEGATIVE_INFINITY };
      for (let i = 0; i < 2; i++) {
        let val = AI.minimax(
          depth + 1,
          nodeIndex * 2 + i,
          false,
          values,
          alpha,
          beta
        );
        best = Math.max(best.value, val.value) === best.value ? best : val;
        alpha = Math.max(alpha.value, best.value) === best.value ? best : alpha;
        if (beta.value <= alpha.value) break;
      }
      return best;
    } else {
      let best = { value: Number.POSITIVE_INFINITY };
      for (let i = 0; i < 2; i++) {
        let val = AI.minimax(
          depth + 1,
          nodeIndex * 2 + i,
          true,
          values,
          alpha,
          beta
        );
        best = Math.min(best.value, val.value) === best.value ? best : val;
        beta = Math.min(beta.value, best.value) === best.value ? best : beta;
        if (beta.value <= alpha.value) break;
      }
      return best;
    }
  }
}

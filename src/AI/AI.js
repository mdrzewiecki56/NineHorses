import * as scores from "../FieldScores";

export default class AI {
  static calculateValue(field, pawnPositions) {
    const coordsToCheck = { i: field.i, j: field.j };
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
      scores.twentyFive.find(
        coords => coords.i === coordsToCheck.i && coords.j === coordsToCheck.j
      )
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
      scores.twentyFive.find(
        coords => coords.i === coordsToCheck.i && coords.j === coordsToCheck.j
      )
    ) {
      value += 25;
      //IF THERE'S OPPONENT THERE
      if (
        pawnPositions.find(
          position =>
            scores.twentyFive.find(
              coords => coords.i === position.i && coords.j === position.j
            ) && position.mode === 0
        )
      ) {
        value += 12;
      }
      return value;
    }
    if (
      scores.fifteen.find(
        coords => coords.i === coordsToCheck.i && coords.j === coordsToCheck.j
      )
    ) {
      value += 15;
      if (
        pawnPositions.find(
          position =>
            scores.fifteen.find(
              coords => coords.i === position.i && coords.j === position.j
            ) && position.mode === 0
        )
      ) {
        value += 7;
      }
      return value;
    }
    if (
      scores.seven.find(
        coords => coords.i === coordsToCheck.i && coords.j === coordsToCheck.j
      )
    ) {
      value += 6;
      if (
        pawnPositions.find(
          position =>
            scores.seven.find(
              coords => coords.i === position.i && coords.j === position.j
            ) && position.mode === 0
        )
      ) {
        value += 3;
      }
      return value;
    }
    if (
      scores.three.find(
        coords => coords.i === coordsToCheck.i && coords.j === coordsToCheck.j
      )
    ) {
      value += 3;
      if (
        pawnPositions.find(
          position =>
            scores.three.find(
              coords => coords.i === position.i && coords.j === position.j
            ) && position.mode === 0
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

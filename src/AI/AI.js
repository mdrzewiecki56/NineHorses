export default class AI {
  static calculateValue(field, pawnPostisions) {
    // SET VALUES TO ZERO FOR FIELDS WHERE ALREADY IS A BLACK PAWN
    if (
      pawnPostisions.find(
        position =>
          position.i === field.i &&
          position.j === field.j &&
          position.mode === 1
      )
    ) {
      return 0;
    }
    //TODO: Model for certain moves depending how close they are to center
    //TODO: Model for additional points depended on beating pawn postision
    //TODO: IF Center then most important is to leave the field
  }

  static makeDecision(fieldsWithValues) {
    //Alpha-beta prunning implementation
  }
}

import React from "react";
import Horse from "../../Horse/Horse";
import "./Field.scss";
import white from "../../images/white.svg";
import black from "../../images/black.svg";

export default function Field({ position, isCenter, pawn, classList, select }) {
  return (
    <div
      className={`Field ${isCenter ? "center" : ""}`}
      onClick={() => select(position, pawn)}
    >
      {pawn && (
        <div className={classList}>
          {pawn.mode === Horse.HORSE_W && (
            <img src={white} alt="white-horse" className="pawn" />
          )}
          {pawn.mode === Horse.HORSE_B && (
            <img src={black} alt="black-horse" className="pawn" />
          )}
        </div>
      )}
    </div>
  );
}

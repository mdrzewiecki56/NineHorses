import React from 'react';
import Horse from '../Horse';
import './Field.scss';
import wHorse from './wHorse.svg';
import bHorse from './bHorse.svg'


export default function Field(props) {
  return (
    <div
      className={`Field ${props.isCenter ? 'center' : ''}`}
    >
      {
        props.Horse && 
        <div className={props.classList}>
          {props.Horse.mode===Horse.HORSE_W && <img src={wHorse} alt="white-horse" className="pawn"/>}
          {props.Horse.mode===Horse.HORSE_B && <img src={bHorse} alt="black-horse" className="pawn"/>}
        </div>
      }
    </div>
  );
}

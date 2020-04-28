import React from 'react';
import Horse from '../Horse/Horse';
import './Field.scss';
import white from '../images/white.svg';
import black from '../images/black.svg';

export default function Field(props) {
  return (
    <div className={`Field ${props.isCenter ? 'center' : ''}`}>
      {props.Horse && (
        <div className={props.classList}>
          {props.Horse.mode === Horse.HORSE_W && (
            <img src={white} alt='white-horse' className='pawn' />
          )}
          {props.Horse.mode === Horse.HORSE_B && (
            <img src={black} alt='black-horse' className='pawn' />
          )}
        </div>
      )}
    </div>
  );
}

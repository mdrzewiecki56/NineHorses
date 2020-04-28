import React from 'react';
import './Field.scss';

export default function Field(props) {
  return (
    <div
      className={`Field ${props.isCenter ? 'center' : ''}`}
      onClick={() => props.select(props.id, props.Horse && props.Horse.mode)}
    >
      {props.Horse && <div className={props.classList}></div>}
    </div>
  );
}

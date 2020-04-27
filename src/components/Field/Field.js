import React from 'react';
import './Field.scss';

export default function Field(props) {
  return (
    <div
      className={`Field ${props.isCenter ? 'center' : ''}`}
    >
      {props.Horse && <div className={props.classList}>Horse</div>}
    </div>
  );
}

import React from 'react';

export default function Field(props) {
  return (
    <div
      className={
        'Field ' + (props.row === 4 && props.column === 4 ? 'CenterField' : '')
      }
    >
      {props.row}:{props.column}
    </div>
  );
}

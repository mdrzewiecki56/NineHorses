import React from 'react';

export default function Field(props){
    return (
        <div className="Field">
            {props.row}:{props.column}
        </div>
    );
}
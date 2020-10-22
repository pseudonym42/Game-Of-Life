import React from 'react';
import './Cell.css';


const Cell = (props) => {
    const _cellSubClass = props.status === false ? 'dead' : 'alive';
    return (
        <div
            className={`cell ${_cellSubClass}`}
            key={`cell_${props.field}_${props.row}`}
            data-field={props.field}
            data-row={props.row}
        />
    )
}

export default Cell;

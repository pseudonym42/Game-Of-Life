import React from 'react';
import './Button.css';


const Button = (props) => {

    const text = props.isGameRunning ? 'Stop' : 'Start';

    return (
        <button
            className="button"
            onClick={props.toggleGame}
        >
            {text}
        </button>
    )
}

export default Button;

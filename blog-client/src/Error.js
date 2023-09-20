import React from 'react';
import './error.css';

const Error = ({ error }) => {
    return (
        <div id="error">
            {error}
        </div>
    );
};

export default Error;
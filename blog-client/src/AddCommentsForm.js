import React, { useState } from 'react';
// import socketIo from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const AddCommentsForm = (params) => {
    let { commentID } = params;
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/comments', {
                method: 'Post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ commentID, comment })
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            navigate('/');
        }
        catch (e) {
            // setError(`${e}`);
            console.error(e);
        }
    }
    function setFormData(e) {
        if (e.target.name === 'comment') {
            setComment(e.target.value);
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <input placeholder='comments' name="comment" onChange={setFormData}></input>
            <button>submit</button>
        </form>
    );
};

export default AddCommentsForm;
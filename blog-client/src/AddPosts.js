import React, { useState } from 'react';
import Post from './Post';
import { useNavigate } from 'react-router-dom';





const AddPosts = ({ setError }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    function setFormData(e) {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        }
        else {
            setBody(e.target.value);
        }
    }

    const navigate = useNavigate();
    async function onSubmit(e) {

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'Post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ title, body })
            });


            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            navigate('/');
        }
        catch (e) {
            setError(`${e}`);
            console.error(e);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    title:
                    <input name="title" onChange={setFormData} ></input>
                </label>
                <label>
                    body:
                    <input name="body" onChange={setFormData}></input>
                </label>
                <button>submit</button>
            </form>
        </div>
    );
};

export default AddPosts;
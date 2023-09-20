import React, { useState } from 'react';

// import { useNavigate } from 'react-router-dom';





const Login = ({ setError }) => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');

    function setFormData(e) {
        if (e.target.name === 'username') {
            setusername(e.target.value);
        }
        else {
            setpassword(e.target.value);
        }
    }


    async function onSubmit(e) {
        e.preventDefault();

        let field = 'register';
        if (e.type === 'submit') {
            console.log('right');
            field = 'login';
        }
        try {
            const response = await fetch(`http://localhost:8080/${field}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ "username": `${username}`, "password": `${password}` })

            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            setMessage(`${field} succesful`)
        }
        catch (e) {
            setMessage(`${field} failed`);
            console.error(e);
        }

    }

    return (
        <div>
            <div>{message}</div>
            <form onSubmit={onSubmit}>
                <label>
                    username:
                    <input name="username" onChange={setFormData} value={username} ></input>
                </label>
                <label>
                    password:
                    <input name="password" onChange={setFormData} value={password}></input>
                </label>
                {/* login button submits the form */}
                <button  >login</button>

                <button type='button' onClick={onSubmit} >register</button>
            </form>
        </div>
    );
};

export default Login;


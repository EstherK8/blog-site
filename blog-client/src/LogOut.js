import React from 'react';

async function logout() {
    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        // setMessage('login succesful')

    }
    catch (e) {
        // setMessage('login failed');
        console.error(e);
    }

}
const LogOut = () => {
    logout();
    return (
        <div>
            <h2>You have succesfully logged out unless there was an error. I can't check that for you yet though.</h2>
        </div>
    );
};

export default LogOut;
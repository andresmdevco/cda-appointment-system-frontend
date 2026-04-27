import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const LoginRegister = () => {




    const [action, setAction] = useState('');
    // Estados separados para Login
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // Estados separados para Registro
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                name: registerUsername,
                email: registerEmail,
                password: registerPassword
            });
            alert(response.data.message); 
        } catch (error) {
            alert('Error registering user: ' + error.response.data.error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: loginUsername, 
                password: loginPassword
            });
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user_id', response.data.user_id);
            window.location.href = '/home'; 
        } catch (error) {
            alert('Invalid username or password.');
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type='text' 
                               placeholder='Email' required 
                               value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type='password' 
                               placeholder='Password' required 
                               value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <FaLock className='icon'/>
                    </div>
                        <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box register'>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type='text' 
                               placeholder='Username' required 
                               value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} />
                        <FaUser className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type='email' 
                               placeholder='Email' required 
                               value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                        <FaEnvelope className='icon'/>
                    </div>
                    <div className="input-box">
                        <input type='password' 
                               placeholder='Password' required 
                               value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                        <FaLock className='icon'/>
                    </div>
                    <button type='submit'>Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;



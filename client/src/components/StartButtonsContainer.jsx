import React from 'react'
import { useNavigate } from 'react-router-dom';

function LoginButtonsContainer() {
    const navigate = useNavigate();
    return ( 
        <div 
            className="login-buttons-container"
        >
            <button 
                className="login-button"
                onClick={() => navigate('/login')}
            >
                Login
            </button>
            <button 
                className="signup-button"
                onClick={() => navigate('/signup')}
            >
                Sign Up
            </button>
        </div>
     );
}

export default LoginButtonsContainer;
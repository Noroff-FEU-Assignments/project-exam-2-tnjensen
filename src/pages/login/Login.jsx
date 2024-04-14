import { Link, useNavigate} from 'react-router-dom';
import './login.scss';
import {  useState } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../../components/shared/loginUser.js';

export default function Login({setToken,id}){
    const navigate = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState(null);

    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const user = await loginUser({
                email,
                password
            });
            setToken(user.accessToken);
            navigate("/");
        }
        catch(err){
            setError(err);
        }
    }
   
    return(
        <div className="login">
            <div className="card">
                <div className="login-left">
                    <h1>Sentire</h1>
                    <p>Log in to connect and share with your friends.</p>
                    <span>No account yet ?</span>
                        <Link to="/register">
                        <button>Register</button>
                        </Link>
                </div>
                <div className="login-right">
                    <h1>Sign in</h1>
                    <form>
                        <input placeholder="email" aria-label="email" type="email" onChange={e => setEmail(e.target.value)} />
                        <input placeholder="password" aria-label="password" type="password" onChange={e => setPassword(e.target.value)} minLength="6" />
                        {error && error }
                        <button type='submit' onClick={handleSubmit}>Login</button>       
                    </form>          
                </div>
            </div>
        </div>
    )
} 
/* Login.propTypes = {
    setToken: PropTypes.func.isRequired
}; */
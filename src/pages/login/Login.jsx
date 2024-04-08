import { Link } from 'react-router-dom';
import './login.scss';

function Login(){
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
                    <h1>Login</h1>
                    <form>
                        <input placeholder="email" aria-label="email" type="email" className="loginEmail" />
                        <input placeholder="password" aria-label="password" type="password" className="loginPassword" minLength="6" />
                        <button>Log in</button>       
                    </form>          
                </div>
            </div>
        </div>
    )
} 
export default Login;
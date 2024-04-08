import { Link } from 'react-router-dom';
import './register.scss';

function Register(){
    return(
        <div className="register">
            <div className="card">
                <div className="register-left">
                    <h1>Sentire</h1>
                    <p>Register to start sharing with your friends.</p>
                    <span>Already have an account ?</span>
                        <Link to="/login">
                        <button>Login</button>
                        </Link>
                </div>
                <div className="register-right">
                    <h1>Register</h1>
                    <form>
                        <input placeholder="name" aria-label="name" type="text" />
                        <input placeholder="email" aria-label="email" type="email" />
                        <input placeholder="password" aria-label="password" type="password" minLength="6" />
                        <input placeholder="avatar-link optional" aria-label="avatar" type="password" minLength="6" />
                        <button>Register</button>       
                    </form>          
                </div>
            </div>
        </div>
    )
}
export default Register;

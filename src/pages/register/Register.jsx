import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import { registerUser } from '../../components/shared/registerUser.js';
import * as yup from 'yup';

export default function Register({setToken}){
    const schema = yup.object().shape({
        email: yup.string()
        .email('Please enter a valid email address')
        .matches("^[a-zA-z0-9._%+-]+@stud.noroff.no$")
        .required("Email is required")
    });
    const data = {email: "example@stud.noroff.no"};
    schema.validate(data)
    .then(valid => console.log(valid))
    .catch(error => console.log(error));
    
    const navigate = useNavigate();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [avatar,setAvatar] = useState();
    const [error,setError] = useState(null);

    const emailValidation = () => {
        const reg = /^[a-zA-z0-9._%+-]+@stud.noroff.no$/;
        if(reg.test(email)){
            handleSubmit();
        }else{
            setError("Only stud.noroff.no addresses allowed");
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        emailValidation();
        try{
            await registerUser({
                name,
                email,
                password,
                avatar
            }) 
           
            navigate("/login");
           
        }
        catch(err){
            setError(err);
        }
    }
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
                    <h1>Sign up</h1>
                    <form>
                        <input placeholder="name" aria-label="name" type="text" onChange={e => setName(e.target.value)} />
                        <input placeholder="email" aria-label="email" type="email" onChange={e => setEmail(e.target.value)} />
                        <input placeholder="password" aria-label="password" type="password" onChange={e => setPassword(e.target.value)} minLength="6" />
                        <input placeholder="avatar-link optional" aria-label="avatar" type="password" onChange={e => setAvatar(e.target.value)} minLength="6" />
                        <button onClick={handleSubmit}>Register</button>       
                    </form>          
                </div>
            </div>
        </div>
    )
}

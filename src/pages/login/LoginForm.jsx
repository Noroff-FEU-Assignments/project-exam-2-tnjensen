import { useState } from "react";
import { useUserActions } from "../../stores/useUserStore";
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUrl } from "../../constants/api";

const schema = yup
.object({
    email:yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
    password: yup.string().required("Please enter a password"),
})
.required();
function LoginForm(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {setUser} = useUserActions();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(schema)
    });
    console.log(errors);
    
    async function onSubmit(data){
        console.log(data);

        const options = {
            headers: {
                "Content-Type":"application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        };

        try{
            setIsLoading(true);
            setError(null);
            const response = await fetch(loginUrl, options);
            const json = await response.json();

            if(response.ok){
                return setError(json.errors?.[0]?.message ?? "There was an error")
            }
            setUser(json);
            navigate("/");
        }   
        catch(err){
            setError(error.toString());
        } finally{
            setIsLoading(false);
        }
    }
    return(
        <div className="form">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={isLoading}>
                       <input type="email" {...register("email")} placeholder="Email" />
                       <input type="password" {...register("password")} placeholder="Password" />
                       <input type="submit" value="Login" />
                </fieldset>
            </form>
        </div>
    )
}
export default LoginForm;
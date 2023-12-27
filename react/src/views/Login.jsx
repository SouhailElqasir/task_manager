import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { createRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useState } from "react";
export default function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState(null)
    const onSubmit = ev => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }
    return (

        <div class="login-box">
            <p>Login</p>
            <form onSubmit={onSubmit}>
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <div class="user-box">
                    <input required="" name="" type="text" ref={emailRef} />
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input required="" name="" type="password" ref={passwordRef} />
                    <label>Password</label>
                </div>
                <button class="cta">
                    <span class="hover-underline-animation"> Login </span>
                    <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                </button>
            </form>
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </div>
    )
}

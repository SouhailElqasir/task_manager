import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider";
export default function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors, setErrors] = useState(null)
    const onSubmit = ev => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }
    return (
        <form onSubmit={onSubmit} class="container">

            <div class="cardd">
                <a class="singup">Sign Up</a>
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }<div class="inputBox1" >
                    <input type="text" required="required" ref={nameRef} />
                    <span class="user">Username</span>
                </div>
                <div class="inputBox">
                    <input type="text" required="required" ref={emailRef} />
                    <span>Email</span>
                </div>
                <div class="inputBox">
                    <input type="password" required="required" ref={passwordRef} />
                    <span>Password</span>
                </div><div class="inputBox">
                    <input type="password" required="required" ref={passwordConfirmationRef} />
                    <span>Password confirmation</span>
                </div>
                <button class="enter">Enter</button>
                <p className="messagee">Already registered? <Link to="/login">Sign In</Link></p>
            </div>
        </form>
    )
}

import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function UserForm() {
    let { id } = useParams();
    const [users, setUsers] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()
    const { user } = useStateContext();
    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };
    if (id) {
        useEffect(() => {
            setLoading(true)

            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUsers(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (user.isadmin === 0) {
            redirectToDashboard();
        }
    }, [user])
    const onSubmit = ev => {
        ev.preventDefault()
        if (users.id) {
            axiosClient.put(`/users/${users.id}`, users)
                .then(() => {
                    setNotification('User was successfully updated')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            axiosClient.post('/users', users)
                .then(() => {
                    setNotification('User was successfully created')
                    navigate('/users')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }
    return (
        <div className="card animated fadeInDown">

            <div >
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <div class="cardd">
                        <div class="cardd-header">
                            <div class="text-header">{users.id && <h1>Update User: {users.name}</h1>}
                                {!users.id && <h1>New User</h1>}</div>
                        </div>
                        <div class="cardd-body">
                            <form action="#" onSubmit={onSubmit}>
                                <div class="form-group">
                                    <label for="username">Username:</label>
                                    <input required="" class="form-control" name="username" id="username" type="text" value={users.name} onChange={ev => setUsers({ ...users, name: ev.target.value })} placeholder="Name" />
                                </div>
                                <div class="form-group">
                                    <label for="email">Email:</label>
                                    <input required="" class="form-control" name="email" id="email" type="email" value={users.email} onChange={ev => setUsers({ ...users, email: ev.target.value })} placeholder="Email" />
                                </div>
                                <div class="form-group">
                                    <label for="password">Password:</label>
                                    <input required="" class="form-control" name="password" id="password" type="password" onChange={ev => setUsers({ ...users, password: ev.target.value })} placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <label for="confirm-password">Confirm Password:</label>
                                    <input required="" class="form-control" name="confirm-password" id="confirm-password" type="password" onChange={ev => setUsers({ ...users, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                                </div>
                                <input type="submit" class="btnN" value="submit" />    </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
export default function Newtask() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState(null)
    const [body, setBody] = useState('');
    const [deadline, setDeadline] = useState();
    const [users, setUsers] = useState([]);
    const { user } = useStateContext();
    const [assigne_to, setAssigne_to] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext()
    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };
    const navigate = useNavigate();
    useEffect(() => {
        getUsers();
        if (user.isadmin === 0) {
            redirectToDashboard();
        }
    }, [user])
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    const creatTask = async (e) => {
        e.preventDefault();
        const task = {
            title,
            body,
            deadline,
            assigne_to,
            note,
        };
        try {
            await axiosClient.post('/tasks', task);
            setNotification('task was successfully created');
            navigate('/dashboard')
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }
    }
    return (
        <div  >
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }}>

                <div>
                    <Link to="/templates" className="button">
                        <span className="button__text">Templates</span>
                        <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                    </Link></div>
            </div>
            <div class="form">
                <center class="subtitle" >
                    <h1>Create new task</h1>
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
                        <form onSubmit={(e) => creatTask(e)} class="input-container ic1">
                            <input placeholder="Title" value={title} class="input"
                                onChange={(e) => setTitle(e.target.value)} />
                            <textarea placeholder="Desciption" value={body} class="input"
                                onChange={(e) => setBody(e.target.value)} />
                            <textarea placeholder="Note" value={note} class="input"
                                onChange={(e) => setNote(e.target.value)} />
                            <br></br>
                            <input type="datetime-local" placeholder="Deadline" value={deadline}
                                onChange={(e) => setDeadline(e.target.value)} />
                            <div>
                                <select value={assigne_to} onChange={(e) => setAssigne_to(e.target.value)}>Assigne to
                                    <option disabled value="" >Choose a user...</option>
                                    {
                                        users?.map(user => (
                                            <option key={user.id} value={user.name}>{user.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="submit">Save</button>
                        </form>
                    )}
                </center>
            </div>
        </div>
    )
}

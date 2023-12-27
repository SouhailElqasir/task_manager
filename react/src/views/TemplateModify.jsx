import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
export default function TemplateModify() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState(null)
    const [body, setBody] = useState('');
    const [note, setNote] = useState('');
    const [deadline, setDeadline] = useState();
    const [users, setUsers] = useState([]);
    const { user } = useStateContext();
    const [done, setDone] = useState(0);
    const [assigne_to, setAssigne_to] = useState('');
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    let { id } = useParams();
    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };
    const [template, setTemplate] = useState({
        id: null,
        title: '',
        body: '',
        deadline: '',
        done: '',
        assigne_to: '',
        note: '',
    })
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/templates/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setTemplate(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }
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
    useEffect(() => {
        fetchTask();
    }, [])
    const fetchTask = async () => {
        try {
            const response = await axiosClient.get(`templates/${id}`);
            setTitle(response.data.title);
            setBody(response.data.body);
            setDeadline(response.data.deadline);
            setAssigne_to(response.data.assigne_to);
            setDone(response.data.done);
            setNote(response.data.note);
        } catch (error) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }
    }
    const ModifyTask = async (e) => {
        e.preventDefault();
        const task = {
            title,
            body,
            deadline,
            assigne_to,
            done,
            note,
        };
        try {
            await axiosClient.post('/tasks', task);
            setNotification('Template was successfully created');
            navigate('/dashboard')
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }
    }
    return (
        <div class="form">
            <center class="subtitle">
                {template.id && <h1> {template.title}</h1>}
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

                    <form onSubmit={(e) => ModifyTask(e)} class="input-container ic1">
                        <input placeholder="Title" value={title} class="input"
                            onChange={(e) => setTitle(e.target.value)} />
                        <textarea className="textarea" placeholder="Desciption" class="input" value={body}
                            onChange={(e) => setBody(e.target.value)} />
                        <textarea className="textarea" placeholder="Note" class="input" value={note}
                            onChange={(e) => setNote(e.target.value)} />
                        &nbsp;
                        <label for="data" class="lb">
                            <input type="datetime-local" class="infos" placeholder="Deadline" value={deadline}
                                onChange={(e) => setDeadline(e.target.value)} /></label>
                        <div>
                            <select value={assigne_to} onChange={(e) => setAssigne_to(e.target.value)}>Assigne to
                                <option disabled value="" >Choose a user...</option>
                                {
                                    users?.map(user => (
                                        <option key={user.id} value={user.name}>{user.name}</option>
                                    ))
                                }
                            </select></div>
                        Done
                        <div class="toggler">
                            <input id="toggler-1" onChange={(e) => setDone(!done)} name="toggler-1" type="checkbox" value="1" checked={done} />
                            <label for="toggler-1">
                                <svg class="toggler-on" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                    <polyline class="path check" points="100.2,40.2 51.5,88.8 29.8,67.5"></polyline>
                                </svg>
                                <svg class="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                    <line class="path line" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
                                    <line class="path line" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
                                </svg>
                            </label>
                        </div>
                        <button type="submit" className="submit">Save</button>
                    </form>
                )}
            </center>
        </div>
    )
}


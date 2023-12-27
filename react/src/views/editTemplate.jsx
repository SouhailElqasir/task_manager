import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
export default function EditTemplate() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState(null)
    const [body, setBody] = useState('');
    const [note, setNote] = useState('');
    const [users, setUsers] = useState([]);
    const { user } = useStateContext();
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
        }, [user])
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
            setNote(response.data.note);
        } catch (error) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors)
            }
        }
    }
    const UpdateTask = async (e) => {
        e.preventDefault();
        const template = {
            title,
            body,
            note,
        };
        try {
            await axiosClient.put(`/templates/${id}`, template);
            setNotification('Task was successfully updated');
            navigate('/templates')
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
                {template.id && <h1>Edite: {template.title}</h1>}
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
                    <form onSubmit={(e) => UpdateTask(e)} class="input-container ic1">
                        <input placeholder="Title" value={title} class="input"
                            onChange={(e) => setTitle(e.target.value)} />
                        <textarea className="textarea" placeholder="Desciption" class="input" value={body}
                            onChange={(e) => setBody(e.target.value)} />
                        <textarea className="textarea" placeholder="Note" class="input" value={note}
                            onChange={(e) => setNote(e.target.value)} />
                        &nbsp;
                        <button type="submit" className="submit">Save</button>
                    </form>
                )}
            </center>
        </div>
    )
}


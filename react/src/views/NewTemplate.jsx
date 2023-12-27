import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom"
import axiosClient from "../axios-client";
export default function Newtemplate() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState(null)
    const [body, setBody] = useState('');
    const [note, setNote] = useState();
    const [users, setUsers] = useState([]);
    const { user } = useStateContext();
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
    const creatTemplate = async (e) => {
        e.preventDefault();
        const template = {
            title,
            body,
            note,
        };
        try {
            await axiosClient.post('/templates', template);
            setNotification('template was successfully created');
            navigate('/templates')
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
            </div>
            <div class="form">
                <center class="subtitle" >
                    <h1>Create new template</h1>
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
                        <form onSubmit={(e) => creatTemplate(e)} class="input-container ic1">
                            <input placeholder="Title" value={title} class="input"
                                onChange={(e) => setTitle(e.target.value)} />
                            <textarea className="textarea" placeholder="Desciption" value={body} class="input"
                                onChange={(e) => setBody(e.target.value)} />
                            &nbsp;
                            <input placeholder="Note" value={note} class="input"
                                onChange={(e) => setNote(e.target.value)} />

                            <button type="submit" className="btn">Save</button>
                        </form>
                    )}
                </center>
            </div>
        </div>
    )
}

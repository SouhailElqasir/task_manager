import React, { useState, useEffect } from "react"
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
export default function TaskDone() {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState(null)
    const [body, setBody] = useState('');
    const [deadline, setDeadline] = useState();
    const [note, setNote] = useState();
    const { user } = useStateContext();
    const [done, setDone] = useState(0);
    const [assigne_to, setAssigne_to] = useState('');
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const navigate = useNavigate();
    let { id } = useParams();
    const [task, setTask] = useState({
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
            axiosClient.get(`/tasks/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setTask(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [user])
    }
    useEffect(() => {
        fetchTask();
    }, [])
    const fetchTask = async () => {
        try {
            const response = await axiosClient.get(`tasks/${id}`);
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
    const UpdateTask = async (e) => {
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
            await axiosClient.put(`/tasks/${id}`, task);
            setNotification('Task was successfully updated');
            navigate('/myTasks')
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
                {task.id && <h1>Update Task: {task.title}</h1>}
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
                            onChange={(e) => setTitle(e.target.value)} disabled />
                        <textarea className="textarea" placeholder="Desciption" value={body} class="input"
                            onChange={(e) => setBody(e.target.value)} disabled />
                        &nbsp;
                        <label for="data" class="lb">
                            <input type="datetime-local" class="infos" placeholder="Deadline" value={deadline}
                                onChange={(e) => setDeadline(e.target.value)} disabled /></label>
                        <textarea className="textarea" placeholder="Note" value={note} class="input"
                            onChange={(e) => setNote(e.target.value)} />
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


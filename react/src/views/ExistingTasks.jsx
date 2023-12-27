import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
export default function ExistingTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useStateContext();
    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };
    useEffect(() => {
        fetchTasks();
        setLoading(true)
        if (user.isadmin === 0) {
            redirectToDashboard();
        }
    }, [user])
    const fetchTasks = async () => {
        try {
            const response = await axiosClient.get('/tasks')
            setLoading(false)
            setTasks(response.data);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Existing Tasks</h1>
            </div>
            <div className="card animated fadeInDown" >
                <table   >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            {
                                user.isadmin === 1 ? (
                                    <th>Actions</th>
                                ) : <></>
                            }
                        </tr>
                    </thead>
                    {loading &&
                        <div class="loader">
                            <span class="loader-text">loading</span>
                            <span class="load"></span>
                        </div>
                    }
                    {!loading &&
                        <tbody>
                            {tasks.data?.map(task =>
                                <tr key={task.id} >
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.body}</td>
                                    {user.isadmin === 1 ? (<td>
                                        <Link className="btn-edit" to={'/modify/' + task.id}>Modify</Link>
                                        &nbsp;
                                    </td>) : <></>}
                                </tr>)
                            }
                        </tbody>
                    }
                </table>

            </div>
        </div>
    )
}


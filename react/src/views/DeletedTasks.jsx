import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import React, { useEffect, useState } from "react"
export default function DeletedTasks() {
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useStateContext();
    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };
    useEffect(() => {
        setLoading(true)

        fetchdeletedTasks();
        if (user.isadmin === 0) {
            redirectToDashboard();
        }
    }, [user])
    const fetchdeletedTasks = async () => {
        try {
            const response = await axiosClient.get('/deletedTasks')
            setLoading(false)
            setDeletedTasks(response.data);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Deleted Tasks</h1>
            </div>
            <div className="card animated fadeInDown">
                <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Create Date</th>
                            <th>Deadline</th>
                            <th>AssigneTo</th>
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
                            {deletedTasks.data?.map(task =>
                                <tr key={task.id} >
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.body}</td>
                                    <td>{task.created_at}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.assigne_to}</td>
                                </tr>)
                            }
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

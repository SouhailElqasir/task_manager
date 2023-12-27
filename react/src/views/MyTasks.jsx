import React, { useState, useEffect } from "react"
import axiosClient from "../axios-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faHourglass,faCheck } from '@fortawesome/free-solid-svg-icons'
 import { Link } from "react-router-dom";
export default function MyTasks() {
    const [tasks, setTasks] = useState([]);
    const [done, setDone] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        axiosClient.get('/my-tasks')
            .then((data) => {
                setLoading(false)
                setTasks(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [])
    const checkIfTaskIsDone = (done) => (
        done ? (
            <span >
                <FontAwesomeIcon icon={faCheck} />
            </span>
        ) :
            (
                <span>
                    <FontAwesomeIcon icon={faHourglass} />
                </span>
            )
    )
    return (
        <><h1>My Tasks</h1>
            <div className="card animated fadeInDown">
                <table >
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Status</th>
                            <th>Create Date</th>
                            <th>Deadline</th>
                            <th>AssigneTo</th>
                            <th>Note</th>
                            <th>Actions</th>
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
                                    <td>
                                        {checkIfTaskIsDone(task.done)}
                                    </td>
                                    <td>{task.created_at}</td>
                                    <td>{task.deadline}</td>
                                    <td>{task.assigne_to}</td>
                                    <td>{task.note}</td>
                                    <td><Link className="btn-edit" to={'/taskDone/' + task.id}>Done?</Link></td>
                                </tr>)
                            }
                        </tbody>
                    }
                </table>
            </div>
        </>)
}

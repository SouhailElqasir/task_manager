import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass, faCheck, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function Dashboard() {
    const [done, setDone] = useState(0);
    const [tasks, setTasks] = useState([]);
    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);
    const { user } = useStateContext();
    useEffect(() => {
        fetchTasks();
        setLoading(true);
    }, [])
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
    const onDeleteClick = taskId => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return
        }
        axiosClient.delete(`/tasks/${taskId}`)
            .then(() => {
                setNotification('Task was successfully deleted')
                fetchTasks()
            });
    }
    const checkIfTaskIsDone = (done) => (
        done ? (
            <span >
                <FontAwesomeIcon icon={faCheck} />
            </span>
        ) :
            (
                <span >
                    <FontAwesomeIcon icon={faHourglass} />
                </span>
            )
    )
    return (
        <div >
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Tasks</h1>
                {
                    user.isadmin === 1 ? (
                        <div>
                            <Link to="/newtask" className="button">
                                <span className="button__text">Add new task</span>
                                <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                            </Link></div>
                    ) : <></>
                }
            </div>
            <div className="card animated fadeInDown">
                <table >
                    <thead>
                        <tr >
                            <th>ID </th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Status</th>
                            <th>Deadline</th>
                            <th>AssigneTo</th>
                            <th>Note</th>
                            {user.isadmin === 1 ? (
                                <th>Actions</th>) : <></>
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
                            {tasks.data?.map((task,index) =>
                                <tr key={task.id} >
                                    <td>{index+1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.body}</td>
                                    <td>
                                        {checkIfTaskIsDone(task.done)}
                                    </td>
                                    <td>{task.deadline}</td>
                                    <td>{task.assigne_to}</td>
                                    <td>{task.note}</td>
                                    {user.isadmin === 1 ? (
                                        <td>
                                            <Link class="btn-edit" to={'/dashboard/' + task.id}><FontAwesomeIcon icon={faPen} /></Link>
                                            &nbsp;
                                            <button class="tooltip" onClick={ev => onDeleteClick(task.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                                                    <path fill="#6361D9" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                </svg>
                                                <span class="tooltiptext" >Delete</span>
                                            </button>
                                        </td>) : <></>}
                                </tr>)
                            }
                        </tbody>
                    }
                </table>
                {
                    user.isadmin === 1 ? (
                        <div class="mydict">
                            <div>
                                <label>
                                    <Link to={"/dashboard"}>
                                        <input type="radio" name="radio" />
                                        <span>All tasks</span></Link>
                                </label>
                                <label>
                                    <Link to={"/tasksdone"}>
                                        <input type="radio" name="radio" />
                                        <span>Tasks done</span></Link>
                                </label><label>
                                    <Link to={"/tasksundone"}>
                                        <input type="radio" name="radio" />
                                        <span>Tasks not done yet</span></Link>

                                </label>
                            </div>
                        </div>) : <></>
                }
            </div>

        </div>
    )
}

import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }
    const onLogout = ev => {
        ev.preventDefault()
        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }
    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                {
                    user.isadmin === 1 ? (
                        <Link to="/users">Users</Link>
                    ) : <></>
                }
                {
                    user.isadmin === 1 ? (
                        <Link to="/deletedTasks">Deleted Tasks</Link>
                    ) : <></>
                }{
                    user.isadmin === 1 ? (
                        <Link to="/templates">Templates</Link>
                    ) : <></>
                }
                {
                    user.isadmin === 0 ? (
                        <Link to="/myTasks">My Tasks</Link>
                    ) : <></>
                }
            </aside>
            <div className="content">
                <header>
                    <div class="loader">
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__bar"></div>
                        <div class="loader__ball"></div>
                    </div>
                    <div>
                        Welcome ,        {user.name} &nbsp; &nbsp;
                        <button className="buttonn" onClick={onLogout}> <span>Logout</span>
                        </button>

                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
                {notification &&
                    <div className="notification">
                        {notification}
                    </div>
                }
            </div>
        </div>
    )
}


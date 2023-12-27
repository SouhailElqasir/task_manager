import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Newtask from "./views/NewTask";
import SignUp from "./views/SignUp";
import Users from "./views/Users";
import EditTask from "./views/EditTask";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/userForm";
import ExistingTasks from "./views/ExistingTasks";
import Modify from "./views/Modify";
import DeletedTasks from "./views/DeletedTasks";
import MyTasks from "./views/MyTasks";
import TaskDone from "./views/TaskDone";
import Templates from "./views/Templates";
import Newtemplate from "./views/NewTemplate";
import TemplateModify from "./views/TemplateModify";
import TasksDone from "./views/TasksDone";
import EditTemplate from "./views/editTemplate";
import TasksunDone from "./views/TasksunDone";
const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/tasksdone',
                element: <TasksDone />
            },
            {
                path: '/tasksundone',
                element: <TasksunDone />
            },
            {
                path: '/templates',
                element: <Templates />
            },
            {
                path: '/newtask',
                element: <Newtask />
            },
            {
                path: '/newtemplate',
                element: <Newtemplate />
            },
            {
                path: '/edittask',
                element: <EditTask />
            },
            {
                path: '/exsitingtasks',
                element: <ExistingTasks />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/deletedTasks',
                element: <DeletedTasks />
            },
            {
                path: '/myTasks',
                element: <MyTasks />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/dashboard/:id',
                element: <EditTask key="taskUpdate" />
            },
            {
                path: '/modify/:id',
                element: <Modify key="taskModify" />
            },
            {
                path: '/edittemplate/:id',
                element: <EditTemplate key="editTemplate" />
            },
            {
                path: '/templatemodify/:id',
                element: <TemplateModify key="templateModify" />
            },
            {
                path: '/taskDone/:id',
                element: <TaskDone key="showTasks" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },

            {
                path: '/signUp',
                element: <SignUp />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
]);
export default router;

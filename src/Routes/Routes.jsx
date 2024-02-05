import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import Navbar from "../Components/Navbar/Navbar";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Contact from "../Pages/Contact/Contact";
import Home from "../Pages/Home/Home";
import AddUser from "../Pages/Dashboard/AllUsers/AddUser";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/dashboard',
        element: 
        <>
           <PrivateRoute>
            <Navbar></Navbar>
            <Dashboard></Dashboard>
           </PrivateRoute>
        </>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: '/dashboard/addUser',
                element: <AddUser></AddUser>
            },
            
        ]
    }
])
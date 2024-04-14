import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/register/Register.jsx';
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const ProtectedRoute = ({children}) => {
  const [token,setToken] = useLocalStorage("token");

  if(!token){
    return <Login setToken={setToken} />
  }
  return children;
}
export const Layout = () => {
  return(
    <Outlet />
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)

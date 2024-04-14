import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './hooks/useAuth.jsx';
import Register from './pages/register/Register.jsx';
import Home from './pages/home/Home.jsx';
import Profile from './pages/profile/Profile.jsx';
import Login from './pages/login/Login.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Header from './components/header/Header.jsx';

const ProtectedRoute = ({children}) => {
  const [token,setToken] = useLocalStorage("token");

  if(!token){
    return <Login setToken={setToken} />
  }
  return children;
}
export const Layout = () => {
  return(
    <div className='layout'>
      <Header />
    <div style={{display: "flex"}}>
      <div style={{flex:6}}>
        <Outlet />
        </div>
    </div>
    </div>
   
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
    {/* <RouterProvider router={router}> */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
    {/* </RouterProvider> */}
  </React.StrictMode>,
)

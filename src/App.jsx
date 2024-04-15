import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Layout } from './main';
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Home from './pages/home/Home';

const ProtectedRoute = ({children}) => {
  const [token,setToken] = useLocalStorage("token");

  if(!token){
    return <Login setToken={setToken} />
  }
  return children;
}
function App() {

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Home />}></Route>
        <Route path="profile/:id" element={<Profile />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  )
}

export default App

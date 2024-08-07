import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from "./pages/Home.js"
import CreatePost from "./pages/CreatePost.js"
import Post from "./pages/Post.js"
import Login from "./pages/Login.js"
import Registration from "./pages/Registration.js"
import { AuthContext } from './helpers/AuthContext.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound.js';

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  })

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem("accessToken")
    }}).then((response) => {
      if (response.data.error) {
        setAuthState({
          ...authState, status: false
        })
        console.log(authState)
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        })
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState(false)
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router >
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/createpost">Create A Post</Link>
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path='*' Component={PageNotFound} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

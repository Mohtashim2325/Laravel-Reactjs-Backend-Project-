import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function Layout(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div style={{fontFamily:'sans-serif',padding:20}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <h1><Link to="/">Smart To‑Do</Link></h1>
        <nav>
          <Link to="/">Home</Link> {' | '}
          <Link to="/tasks">Tasks</Link> {' | '}
          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link> {' | '}
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

    </div>
  )
}
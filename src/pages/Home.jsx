import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex  justify-between p-2'>
        <h1>Hello From Home Page</h1>
        <Link to="/admin/login">Admin Login</Link>
    </div>
  )
}

export default Home
import React from 'react'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      Homepage
      <Outlet/>
    </div>
  )
}

export default Home

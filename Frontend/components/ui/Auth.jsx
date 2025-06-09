import React from 'react'
import { Button } from './button'
import { NavLink } from 'react-router-dom'


const Auth = () => {
  return (
    <div>
      <NavLink to ="./SignIn"><Button className="hover:bg-blue-500! text-black">Login</Button></NavLink>
      <NavLink to="./SignUp"><Button className="hover:bg-blue-500! text-black"> Sign Up</Button></NavLink>
      
    </div>
  )
}

export default Auth

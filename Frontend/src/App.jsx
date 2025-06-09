import './App.css'
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import { Button } from '@/components/ui/button'
import Home from '@/components/ui/Home';
import Auth from '@/components/ui/Auth';
import SignIn from '@/components/ui/SignIn';
import SignUp from '@/components/ui/SignUp';
const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Home/>,
      children: [
        {
          index: true,
          element: <Auth/>
        },
      ]
    },
    {
      path: "/SignIn",
      element: <SignIn/>
    },
    {
      path: "/SignUp",
      element: <SignUp/>
    }
  ]
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

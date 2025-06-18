import './App.css'
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import { Button } from '@/components/ui/button'
import Home from '@/components/ui/Home';
import SignIn from '@/components/ui/SignIn';
import SignUp from '@/components/ui/SignUp';
import Dashboard from '@/components/ui/Dashboard';
import ProjectList from '@/components/ui/ProjectList';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import CreateForm from '@/components/ui/CreateForm';
import CreateTask from '@/components/ui/CreateTask';
import WorkCount from '@/components/ui/WorkCount';
const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Home/>,
    },
    {
      path: "/SignIn",
      element: <SignIn/>
    },
    {
      path: "/SignUp",
      element: <SignUp/>
    },
    {
      path: "/Dashboard",
      element: <Dashboard/>,
    },
    {
      path: "/Sidebar",
      element: <Sidebar/>,
    },
    {
      path: "/Header",
      element: <Header/>
    },
    {
      path: "/CreateForm",
      element: <CreateForm/>
    },
    {
      path: "/ProjectList",
      element: <ProjectList/>
    },
    {
      path: "/CreateTask",
      element: <CreateTask/>
    },
    {
      path: "/WorkCount",
      element: <WorkCount/>
    },
  ]
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

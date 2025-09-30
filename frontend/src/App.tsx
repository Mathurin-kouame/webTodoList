// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from 'react'
import './App.css'
import Dashboard from "./pages/Dashboard";
import  Project  from "./pages/Project";
import Task  from "./pages/Task";


const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <Login/>
      </Suspense>
    )
  },
  {
    path: "/register",
    element: (
      <Suspense>
        <Register/>
      </Suspense>
    )
  },
  {
    path: "/dashboard",
    element: (
      <Suspense>
        <Dashboard />
      </Suspense>
    )
  },
  {
    path: "/project/:id",
    element: (
      <Suspense>
        <Project />
      </Suspense>
    )
  },
  {
    path: "/project/:id/task/new",
    element: (
      <Suspense>
        <Task />
      </Suspense>
    )
  }
])

export default function App() {
    return <RouterProvider router={router} />;
}


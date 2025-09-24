// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from 'react'
import './App.css'




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
  }
])

export default function App() {
    return <RouterProvider router={router} />;
}


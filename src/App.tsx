import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SideMenu from "./components/SideMenu"

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div style={{ display: 'flex' }}>
        <SideMenu /> {/* Ditambahkan */}
        <h1>Home</h1>
      </div>
    ),
  },
  {
    path: 'task-list',
    element: (
      <div style={{ display: 'flex' }}>
        <SideMenu /> {/* Ditambahkan */}
        <h1>Task List</h1>
      </div>
    ),
  },
  {
    path: 'task-progress',
    element: (
      <div style={{ display: 'flex' }}>
        <SideMenu /> {/* Ditambahkan */}
        <h1>Task Progress</h1>
      </div>
    ),
  },
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
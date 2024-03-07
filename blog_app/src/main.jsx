import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import CreatePost from './componentes/createpost.jsx'
import PostList from './componentes/postList.jsx'

const router = createBrowserRouter([
  {path:"/",element:<App/>,children:[
    {path:"/",element:<PostList/>},
    {path:"/createPost",element:<CreatePost/> },
  ]},
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

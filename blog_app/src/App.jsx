
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './componentes/header';
import Footer from './componentes/footer';
import Sidebar from './componentes/sidebar';
import { useState } from 'react';
import PostListProvider from './store/post-list-store';
import { Outlet } from 'react-router-dom';


function App() {
  
  const [selectTab, setSelectTab] = useState("Home");


  return (

    <PostListProvider>
    <div className="app-contaier">
      <Sidebar selectTab = {selectTab} setSelectTab = {setSelectTab}/>
    <div className="content">
      <Header/>
   
      <Outlet/>  
      
      <Footer/>
    </div>
    </div>
    </PostListProvider>
  )
}

export default App

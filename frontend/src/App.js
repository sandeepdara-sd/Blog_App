import React, { useEffect } from 'react'
import Header from './components/Header.js'
import {Routes,Route} from 'react-router-dom'
import Auth from './components/Auth.js'
import Blogs from './components/Blogs.js'
import UserBlog from './components/UserBlog.js'
import AddBlog from './components/AddBlog.js'
import BlogDetail from './components/BlogDetail.js'

import {useDispatch, useSelector} from 'react-redux'
import { authActions } from './store/index.js'
import Signup from './components/Signup.js'
import First from './components/First.js'
import UserInfo from './components/UserInfo.js'


const App = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state=> state.isLoggedIn)
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[dispatch]);
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        { !isLoggedIn ? 
        <>
        <Route path='/auth' element={<Auth/>} /> 
        <Route path='/' element={<First/>} /> 
        <Route path='/signup' element={<Signup/>} /> </>:

          <>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blogs/add' element={<AddBlog/>} />
        <Route path='/myBlogs' element={<UserBlog/>} />
        <Route path='/myBlogs/:id' element={<BlogDetail/>} />
        </>
        
        }
        <Route path="/user-details/:id" element={isLoggedIn ? <UserInfo /> : <First/>} />
      </Routes>
    </main>
  </React.Fragment>
}

export default App

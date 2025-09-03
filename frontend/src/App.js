import React, { useEffect } from 'react'
import Header from './components/Header.js'
import {Routes,Route, Navigate} from 'react-router-dom'
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
import Loading from './components/Loading.js' // Added
import axios from 'axios'
import { serverURL } from './helper/Helper.js'

// Import the enhanced CSS
import './App.css'

// Protected Route Component - Enhanced
const ProtectedRoute = ({ children, isLoggedIn, isLoading, isInitialized }) => {
  // Show loading while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <Loading message="Checking authentication..." />
      </div>
    );
  }
  
  // Redirect to First.js only if we're sure user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, isLoading, isInitialized } = useSelector(state => ({ // Updated
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    isInitialized: state.isInitialized
  }))
  
  useEffect(() => { // Updated
    const checkAuthStatus = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          // Set loading state
          dispatch(authActions.setLoading(true));
          
          // Fetch complete user data from backend
          try {
            const response = await axios.get(`${serverURL}/api/user/${userId}`);
            const userData = response.data.user;
            dispatch(authActions.login(userData));
          } catch (error) {
            console.error('Error fetching user data:', error);
            // If we can't fetch user data, still allow login with just the ID
            dispatch(authActions.login({ _id: userId }));
          }
        } else {
          // No user ID found, mark as not logged in
          dispatch(authActions.setLoading(false));
          dispatch(authActions.setInitialized(true));
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // On error, clear auth and mark as initialized
        localStorage.removeItem("userId");
        dispatch(authActions.logout());
      }
    };

    checkAuthStatus();
  }, [dispatch]);
  
  return (
    <div className="app">
      <Header/>
      <main className="main-content" style={{ marginTop: '80px' }}>
        <Routes>
          {/* Public Routes - Always accessible */}
          <Route path='/' element={
            isInitialized && isLoggedIn ? <Navigate to="/blogs" replace /> : <First/>
          } />
          <Route 
            path='/auth' 
            element={isInitialized && isLoggedIn ? <Navigate to="/blogs" replace /> : <Auth/>} 
          />
          <Route 
            path='/signup' 
            element={isInitialized && isLoggedIn ? <Navigate to="/blogs" replace /> : <Signup/>} 
          />
          
          {/* Protected Routes - Enhanced protection */}
          <Route path='/blogs' element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} isInitialized={isInitialized}>
              <Blogs/>
            </ProtectedRoute>
          } />
          <Route path='/blogs/add' element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} isInitialized={isInitialized}>
              <AddBlog/>
            </ProtectedRoute>
          } />
          <Route path='/myBlogs' element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} isInitialized={isInitialized}>
              <UserBlog/>
            </ProtectedRoute>
          } />
          <Route path='/myBlogs/:id' element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} isInitialized={isInitialized}>
              <BlogDetail/>
            </ProtectedRoute>
          } />
          <Route path="/user-details/:id" element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading} isInitialized={isInitialized}>
              <UserInfo />
            </ProtectedRoute>
          } />
          
          {/* Fallback Route - Only redirect if we're sure user is not logged in */}
          <Route path="*" element={
            isInitialized && !isLoggedIn ? <Navigate to="/" replace /> : <First/>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App

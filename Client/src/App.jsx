import React from 'react'
import {Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from './component/Login'
import UserLayout from './pages/user/Layout'
import UserDashboard from './pages/user/Dashboard'
import AddBlog from './pages/user/AddBlog'
import EditBlog from './pages/user/EditBlog'
import ListBlog from './pages/user/ListBlog'
import Comments from './pages/user/Comments'
import {Toaster} from 'react-hot-toast'
import {useAppContext} from './context/AppContext'


function App() {

  const {token, user} = useAppContext();
  // Check if token exists in localStorage
  
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        
        {/* User Routes */}
        <Route path="/user" element={token && user ? <UserLayout /> : <Login />} >
           <Route index element={<UserDashboard />} />
           <Route path="addBlog" element={<AddBlog />} />
            <Route path="editBlog/:id" element={<EditBlog />} />
           <Route path="listBlog" element={<ListBlog />} />
           <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
     
    </div>
  )
}

export default App

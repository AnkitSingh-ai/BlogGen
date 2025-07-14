import React from 'react'
import {assets}from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../../component/admin/SideBar'
import { useAppContext} from '../../context/AppContext'

function Layout() {
    const { axios, setToken } = useAppContext();
    const navigate = useNavigate(); // Use the hook directly

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (axios.defaults && axios.defaults.headers) {
            axios.defaults.headers.common['Authorization'] = null;
        }
        setToken(null);
        navigate('/'); // Redirect to homepage
    };

    return (
        <>
            <div className='flex items-center justify-between  px-4 py-2 border-b h-[70px] sm:px-12 border-gray-200'>
                <img src={assets.logo} alt="" onClick={() => navigate('/')} className='w-32 sm:w-40 cursor-pointer' />
                <button onClick={handleLogout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
            </div>
            <div className='flex h-[calc(100vh-70px)]'>
                <SideBar />
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;

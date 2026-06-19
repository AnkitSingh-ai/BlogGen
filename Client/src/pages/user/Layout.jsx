import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../component/user/SideBar';

function UserLayout() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <SideBar />
            
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default UserLayout;

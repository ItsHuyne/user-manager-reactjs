import React from 'react';
import SideBar from './SideBar';
import DataGridMem from './DataGrid';
import './Admin.css'
const AdminAccess = () => {
    return (
        <div className='container '>
            <SideBar />
            <DataGridMem/>
        </div>
       
    );
}

export default AdminAccess;

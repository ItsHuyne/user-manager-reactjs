import React from 'react';
import SideBar from './SideBar';
import DataGridMem from './DataGrid';
const AdminAccess = () => {
    return (
        <>
        <SideBar className= 'sidebar '/>
        <DataGridMem/>
        </>
    );
}

export default AdminAccess;

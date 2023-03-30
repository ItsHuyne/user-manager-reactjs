import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { axiosClient } from '../helper/helper';
import { useAuthStore } from '../store/store';


const isAdmin = sessionStorage.getItem('isAdmin');
const userId = sessionStorage.getItem('userId');

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false
  },
  {
    field: 'adress',
    headerName: 'adress',
    width: 300,
    editable: false
  },
  {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        icon={<DeleteIcon />}
        label="Delete"
        showInMenu
        disabled={isAdmin === 'false'}
      />,
      <GridActionsCellItem
        key={params.id}
        icon={<EditIcon />}
        label="Update"
        showInMenu
        disabled={params.id !== userId}
      />
    ]
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', adress:  35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', adress:  42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', adress:  45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', adress:  16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', adress:  null },
  { id: 6, lastName: 'Melisandre', firstName: null, adress:  150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', adress:  44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', adress:  36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', adress:  65 }
];

const DataGridMem = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [user, setUser] = useState({});
  const getUser = async () => {
    const res = await axiosClient.get(`/api/user`);
    const addIndex = res.data.map((user, index) =>{
      return {
        ...user,
        id: index +1 
    }
    });
    sessionStorage.setItem('isAdmin', res.data.isAdmin);
    sessionStorage.setItem('userId', res.data._id);
    setUser(addIndex);
  };
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <div className="content bg-dark">
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={user}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
        };

export default DataGridMem;

import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { axiosClient } from '../helper/helper';
import { useAuthStore } from '../store/store';
import axios from 'axios';

const isAdmin = sessionStorage.getItem('isAdmin');
const userId = sessionStorage.getItem('userId');

const columns = [
  {field: 'username', headerName:"Username",flex: 1},
  { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
    editable: false
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
    editable: false
  },
  {
    field: 'address',
    headerName: 'address',
    flex: 2,
    editable: false
  },
  {
    field: 'actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      
      <GridActionsCellItem
      key={params.row._id}
      icon={<DeleteIcon />}
      label="Delete"
      showInMenu
      disabled={isAdmin === 'false'}
      onClick={() => handleDelete(params.row._id)}  
      // onClick={() => console.log(params)}
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

const token = localStorage.getItem('token');
function handleDelete(id) {
  axios.delete(`http://localhost:8000/api/deleteuser/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (response.data.success) {
        console.log(response.data.message);
      } else {
       console.log(response.data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

// const rows = [
//   { username:,id: 1, lastName: 'Snow', firstName: 'Jon', adress:  35 },
//   { username:,id: 2, lastName: 'Lannister', firstName: 'Cersei', adress:  42 },
//   { username:,id: 3, lastName: 'Lannister', firstName: 'Jaime', adress:  45 },
//   { username:,id: 4, lastName: 'Stark', firstName: 'Arya', adress:  16 },
//   { username:,id: 5, lastName: 'Targaryen', firstName: 'Daenerys', adress:  null },
//   { username:,id: 6, lastName: 'Melisandre', firstName: null, adress:  150 },
//   { username:,id: 7, lastName: 'Clifford', firstName: 'Ferrara', adress:  44 },
//   { username:,id: 8, lastName: 'Frances', firstName: 'Rossini', adress:  36 },
//   { username:,id: 9, lastName: 'Roxie', firstName: 'Harvey', adress:  65 }
// ];

const DataGridMem = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [user, setUser] = useState({});
  const getUser = async () => {
    const res = await axiosClient.get(`/api/user`);
    const addIndex = res.data.map((user, index) =>{
      console.log("ab",user);
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
    <div className='flex justify-center w-full'>
      <div className="content bg-dark w-full ">
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
    </div>
  );
        };

export default DataGridMem;

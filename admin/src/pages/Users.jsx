import React, { useEffect, useState } from 'react'
import { Header, UsersTable } from './../components'
import axios from '../api/axios'

const Users = ({users}) => {
  // const [users, setUsers] = useState([])
  
  
  //   useEffect(() =>{
  //     const token = localStorage.getItem('token');
  //     const headers = {authorization: `Bearer ${token}`}
  
  //     const getAllUsers = async () => {
  //       try {
  //         const response = await axios.get('superdashboard/getallUser', {
  //           headers: headers
  //         });
  //         console.log(response.data);
  //         setUsers(response.data)
  //       }catch (error){
  //         console.log(error);
  //       }
  //     };
  //     getAllUsers()
  
   
  // }, [])
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <UsersTable users={users} />
    </div>
  )
}

export default Users;
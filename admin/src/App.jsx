import React, { useEffect, useState } from 'react';

import { Home, Products, Users, Report, Company, BarChart, LineGraph, Missing, Login, ForgotPassword, PasswordRetrieved, CompanyDetail, Sales} from "./pages";
import {Routes, Route} from "react-router-dom";
import "./App.css"


import { Layout, AdminLayout, Footer } from './components';
import  RequireAuth  from './components/RequireAuth';
import axios from './api/axios';

export default function App() {

  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    const token = localStorage.getItem('token');
    const headers = {authorization: `Bearer ${token}`}

    const getAllCompany = async () => {
      try {
        const response = await axios.get('superdashboard/getallCompany', {
          headers: headers
        });
        
        setCompanies(response.data)
      }catch (error){
        console.log(error);
      }
    };
    const getAllUsers = async () => {
      try {
        const response = await axios.get('superdashboard/getallUser', {
          headers: headers
        });
        
        setUsers(response.data)
      }catch (error){
        console.log(error);
      }
    };


    getAllCompany()
    getAllUsers()
   
  }, [])
  

    return (
        <Routes>     
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<AdminLayout />} >
              <Route path="/home" element={<Home companies={companies} users={users} />} />
              {/* pages  */}
              <Route path="/company" element={<Company />} />
              <Route path="/company/:id" element={<CompanyDetail companies={companies} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users users={users} />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/report" element={<Report />} />
              {/* charts  */}
              <Route path="/line" element={<LineGraph />} />
              <Route path="/bar" element={<BarChart />} />
            </Route>  
          </Route>
            {/* catch all */}
            <Route path="/*" element={<Missing />} />
        </Routes>
      );
    }
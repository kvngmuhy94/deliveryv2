import React, { useEffect, useState } from 'react';
import { Category, Home, Products, Users, Report, Sales, BarChart, LineGraph, ClientIndex, Missing, Login, Signup, EditProductForm, ForgotPassword, PasswordRetrieved, IndexPage, CompanySignup, ProductPage, WaitApproval } from "./pages";
import {Routes, Route} from "react-router-dom";
import {RequireAuth} from "./components"
import "./App.css";
import { Layout, CompanyLayout, Footer, LayoutTwo } from './components';
import axios from './api/axios';
// import PaymentPage from './components/CheckoutForm';
// import PaymentForm from './components/PaymentForm';
// import PayPalGateway from './components/PayPalGateway';


const COMPANY_URL = "company/get" 
export default function App() {
  // const [products, setProducts] = useState([])
  
  
  
  const [companies, setCompanies] = useState([]);

  useEffect(() =>{
    
    const fetchCompanies = async () => {
      const { data } = await axios.get(COMPANY_URL);
      setCompanies(data);
    };
    fetchCompanies();
  }, [])


    
    return (
        <Routes>
          
          {/* <Route path="/" element={<IndexPage />} />    */}

            {/* customer route */}
            <Route path="/" element={<IndexPage companies={companies} />} /> {/* get all companies */}
            
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/awaitapproval" element={<WaitApproval />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/forgotpassword/success" element={<PasswordRetrieved />} />
            {/* <Route path="/checkout" element={<PayPalGateway />} /> */}

          
          <Route path='/company' element={<Layout />} >
            <Route path="/company/:id/index" element={<ClientIndex companies={companies} />} />
            
           
            
            <Route path="/company/:id/product/:id" element={<ProductPage />} />

          </Route>
            {/* company route */}
            <Route element={<RequireAuth />}>
              <Route path="/company/:id/" element={<CompanyLayout />} >
                <Route path="/company/:id/register" element={<CompanySignup />} />
                <Route path="/company/:id/dashboard" element={<Home />} />
                {/* pages  */}
                <Route path="/company/:id/sales" element={<Sales />} />
                <Route path="/company/:id/products" element={<Products />} />
               
                {/* <Route path="/company/:id/product/:id/edit" element={<EditProductForm />} /> */}
                <Route path="/company/:id/category" element={<Category />} />
              
              
                <Route path="/company/:id/users" element={<Users />} />
                <Route path="/company/:id/report" element={<Report />} />
                {/* charts  */}
                <Route path="/company/:id/line" element={<LineGraph />} />
                <Route path="/company/:id/bar" element={<BarChart />} />
                
              </Route>
            </Route>
            {/* catch all */}
            <Route path="/*" element={<Missing />} />
            
          
          
        </Routes>
      );
    }
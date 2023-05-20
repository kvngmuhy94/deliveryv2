import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import { ProductWidget, Footer, ClientNavbar, PrimarySearchAppBar, AllProducts } from './../../components'
import { useStateContext } from '../../context/ContextProvider';
import { dummyCompany, topCompanies, dummyCategories } from '../../dummy-data/database';
import { companyIllustration } from '../../constants';
import { shoeLogo } from '../../dummy-data';
import { MenuItem, TextField } from '@mui/material';
import AppPagination from '../../components/AppPagination';


const ClientIndex = ({ companies}) => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  // const [companies, setCompanies] = useState([])
  const navigate = useNavigate();
  const company = companies.find(company => String(company.id) === sessionStorage.getItem('company_Id'));
  const topProducts = products.slice(-5) 
  // console.log(company)
  // console.log(products);
  // const topProducts = products[2]
  

  // const setCompany =async () => {
  //   const setter = await window.localStorage.setItem("SELECTED_COMPANY", JSON.stringify(compId.id));

  //   const data = window.localStorage.getItem("SELECTED_COMPANY")
  //   setCompanyId(data)
  //   console.log(companyId)

  // }
  // useEffect(() =>{
  //   setCompany()
  // }, [])
  // useEffect(() =>{
  //   window.localStorage.setItem("SELECTED_COMPANY", JSON.stringify(compId.id));
  // }, [compId.id]);  


 

  useEffect(() => {
    // console.log(companyId);
    const token = localStorage.getItem('token');
    const headers = {authorization: `Bearer ${token}`}

    const getProducts = async () =>{

      try {
        const response = await axios.get(`product/getProductByCompany/${company.id}`, {
          headers: headers
        });
        // isMounted && setProducts(response.data)
        // console.log(response.data)
        setProducts(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    const getCategories = async () => {

      try {
        const response = await axios.get(`category/getCategoryByCompany/${sessionStorage.getItem('company_Id')}`, {
          headers: headers
        });
        // console.log(response.data)
        setCategories(response.data)
      } catch (error){
        console.log(error);
      }
    }
    getProducts();
    getCategories();
  }, [])

  // const getProductByCategory = async (selectedCate) => {
  //   const token = sessionStorage.getItem('token');
  //   const headers = {authorization: `Bearer ${token}`}
  //   try {
  //     const response = await axios.get(`product/getByCategory/${selectedCate}`, {
  //       headers: headers
  //     });
  //     console.log(selectedCategory);
  //     console.log(response.data);
  //     setProducts(response.data)
  //   } catch (error){
  //     console.log(error);
  //   }
  // }


 
 
  // const selectedCompany = dummyCompany.find(company => String(company.id) === compId);
  // const {name, logo, slogan} = selectedCompany;
  
  // console.log(selectedCompany.name);
    
    
  
  

  

  return (
    <main className='bg-slate-100 h-screen w-full'>
      
      <header className='bg-gradient-to-r from-indigo-500 to-sky-500 w-100 h-full shadow-xl flex flex-col-reverse md:flex-row justify-center px-10'>
        <div className='flex my-auto justify-center flex-col items-center gap-2 md:gap-5 md:w-1/2'>
          {/* <img src={shoeLogo} alt={"company name"}
            className='w-1/2 h-1/2'
          /> */}
          <h1 className='font-bold text-3xl text-white '>WELCOME TO</h1>
          <h1 className='text-red-500 font-bold font-poppins uppercase text-5xl'>{company?.company_name || "company name"}</h1>
          <h2 className='text-slate-50 text-2xl font-bold'>"{company?.slogan || "slogan"}"</h2>
          <p className='text-slate-50 text-lg font-medium'>{company?.description || "company description"} </p>
          
        </div>
        <div className='my-auto mx-5 md:mx-10 lg:mx-auto w-100 md:w-1/2'>
          <img src={company?.logo || companyIllustration} alt={company?.company_name || "company page"}
            className='w-full h-full'
          />
          
        </div>
      </header>
      <section className='pt-10 px-10  bg-slate-200'> 
        <h2 className='font-bold text-2xl'>Top Products</h2>
        <hr className="h-1 bg-slate-400 border-0" />
        <div className='flex flex-row flex-wrap gap-5 px-5 justify-around py-10'>
          {
            topProducts.map((product, index) =>(
              <div key={product.id}>
                <ProductWidget id={product.id} productName={product.name} image={product.image} price={product.price} productDesc={product.desc} category={product.categoryName} />  
              </div>
            ))
          }          
        </div>
      </section>
      <AllProducts products={products} />
    <Footer />
    </main>
  )
}

export default ClientIndex
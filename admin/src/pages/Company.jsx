import React, { useState, useEffect } from 'react'
import { Header, CompanyTable, CompanyWidget} from './../components'
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'


const Company = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([])

  const [pageNumber, setPageNumber] = useState(0);
  const companiesPerPage = 10;
    const pageVisited = pageNumber * companiesPerPage
    const pageCount = Math.ceil(companies.length / companiesPerPage)

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

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

    getAllCompany()
  }, [companies])
  

  return (
    
    
    <section className="m-2 md:m-5 mt-2 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Companies" />
        {/* <CompanyTable /> */}
        <div className='w-100 flex flex-col gap-5'>
          { 
            companies.length === 0 ?
            <h1 className='text-lg font-bold text-slate-600'>No Company In Database</h1>
            :
            companies.slice(pageVisited, pageVisited + companiesPerPage).map((item, index) => (
              <div key={item.id} >
                
                <div  onClick={() => {
                  navigate(`/company/${item.id}`)
                }}>
                <div className='' >
                  <CompanyWidget name={item.company_name} logo={item.logo} slogan={item.slogan} description={item.description} />
                </div>
                </div>
                
                
              </div>
            ))
            
          }
          
            
            
          
        </div>
        {
           companies.length >= 11 &&

        <ReactPaginate 
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationButtons'}
          previousLinkClassName={'previousButton'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
          
        />
        }
    </section>
    
  )
}

export default Company;
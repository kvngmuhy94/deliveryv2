import React, { useState } from 'react'
import { Header, SalesTable } from '../components'

const Sales = () => {

    const [sales, setSales] = useState([])
  return (
    <div className="m-2 md:m-5 mt-2 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="Page" title="Sales Record" />
    <div>
        <SalesTable sales={sales}/>
    </div>

    </div>
  )
}

export default Sales
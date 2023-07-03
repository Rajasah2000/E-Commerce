import React, { useState } from 'react'
import { Header } from '../../components'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import HttpClient from '../../components/HttpClient';
import toast from 'react-hot-toast'

const Category = () => {
    const [categoryData , setCategorydata] = useState('')
    useEffect(() => {
        fetchCategoryData();
    })

    const fetchCategoryData = async() => {
        let result  = await HttpClient.requestData("viewCategory", "GET");
        console.log("CategoryData" , result);
        try {
            if(result && result.status){
                let arr = result.data.map((item , index) => {
                     return{
                         sl:index+1
                     }
                });
                setCategorydata(arr);
             }
        } catch (error) {
            console.log("err" , error);
        }

    }

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Year',
            selector: row => row.year,
        },
    ];


    
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
    <Header title="Category" />
    <DataTable columns={columns} data={categoryData}/>
  </div>
  )
}

export default Category
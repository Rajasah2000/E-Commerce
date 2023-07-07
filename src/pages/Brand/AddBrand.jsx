import React, { useState } from 'react'
import { Header } from '../../components'
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import HttpClient from '../../components/HttpClient';

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background-color: rgb(3, 201, 215);
  height: 48px;
  border-radius: 2px;
`;

const AddBrand = () => {
    const [brandName , setBarandName] = useState('');
    const [categoryID ,setCategoryId] = useState('');
    const [categoryData , setCategorydata] = useState([]);

    let data = {
        catID: categoryID,
        name:brandName
    }

    

    const addBrand = async () => {
        if(categoryID && brandName){
            let result =await HttpClient.requestData("add-Brand-name" , "POST" ,data );
            console.log("BannerResult", result);
            if(result && result.status){
                toast.success(result?.message);
                setCategoryId('');
                setBarandName('');
            }else{
                toast.error(result?.message)
            }
        }else{
            toast.error("All Fields Are Required");
        }
    }


    useEffect(() => {
        fetchCategoryData();

    },[]);

    const fetchCategoryData = async() => {
      let result  = await HttpClient.requestData("viewCategory", "GET");
      console.log("CategoryData" , result);
      if(result && result.status){
        setCategorydata(result?.data);
      }else{
        toast.error('Error to fetch Category Data')
      }
    }

  return (
    <>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        
        <Header title="Add Brand"/>
        <Wrapper>
            {/* <label for="cars">Choose a category:</label> */}
  <select style={{height: '58px' , borderRadius:'5px'}} id="category" name="category"  value={categoryID}  onChange={(e)=> setCategoryId(e.target.value)}>
    <option value={''}>Select a Category.......</option>
    {categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
    
  </select>
            <TextField type="text"  label="Brand Name"  value={brandName} variant="filled"  onChange={(e) => setBarandName(e.target.value)} />

          
          <LoginButton variant="contained" onClick={addBrand}>
            Add Brand
          </LoginButton>
        </Wrapper>
      </div>
    </>
  )
}

export default AddBrand
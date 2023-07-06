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
const AddSubSubCategory = () => {

    const [subSubCategoryName , setSubSubCategoryName]= useState('');
    const [categoryData , setCategorydata] = useState([]);
    const [subCategoryData , setSubCategoryData] = useState([])
    // const [category , setCategory] = useState('')
    const [categoryId , setCategoryId] = useState('');
    const [subCategoryId , setSubCategoryId] = useState('');
    // const [preview , setPreview] = useState('');
    const [image , setImage] = useState('');

    const imageHandler = async (e) => {
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image",file);
        let result = await HttpClient.fileUplode("upload-Sub-Sub-Catimage", "POST", data);
        console.log("IMAGE", result);
    
        if (result && result.status) {
          toast.success("Image upload Successfully");
          setImage(result.image);
        } else {
          console.log("Failed to upload image!");
        }
    }

    useEffect(() => {
        fetchCategoryData();
        fetchSubCategoryData();
    },[]);

    const fetchSubCategoryData = async () => {
        let result =await HttpClient.requestData("viewSubCategory" , "GET");
        console.log("SubCategoryData" , result);
        if(result && result.status){
            setSubCategoryData(result?.data);
        }else{
            toast.error("Failed to Fetch SubCategory Data")
        }
    }

    const addsubSubCategory = async() => {
        let data = {
            categoryID:categoryId,
            subCategoryID:subCategoryId,
            subSubCatName:subSubCategoryName,
            img:image
        }
        
        if(categoryId && subCategoryId && subSubCategoryName && image){
          let result = await HttpClient.requestData("addSubSubCategory", "POST" , data);
          console.log("ResultSUBSUB" , result);
          if(result && result?.status){

            toast.success(result.message);
            setCategoryId('');
            setSubCategoryId('');
            setSubSubCategoryName('');
            setImage('')
            let file = document.querySelector("#images");
            file.value = "";
          }else{
            toast.error("Failed to add subSubCategory data")
          }
        }else{
          toast.error("All Fields Are Required");
        }

    }

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
            <Header title="Add SubSubCategory" />
            <Wrapper>
            {/* <label for="cars">Choose a category:</label> */}
  <select style={{height: '58px' , borderRadius:'5px' , marginBottom:'24px'}} id="category" name="category" value={categoryId} onChange={(e)=> setCategoryId(e.target.value)}>
    <option value={''}>Select a Category.......</option>
    {categoryData.map((item , index) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.catName}</option>
      )
    })}
    
  </select>
  <select style={{height: '58px' , borderRadius:'5px'}} id="category" name="category" value={subCategoryId} onChange={(e)=> setSubCategoryId(e.target.value)}>
    <option value={''}>Select a SubCategory.......</option>
    {subCategoryData.map((item) => {
      return(
        <option id={item?._id}  value={item?._id}>{item?.subcatName}</option>
      )
    })}
    
  </select>
            <TextField type="text"  label="SubSubCategory Name" value={subSubCategoryName} variant="filled" onChange={(e) => setSubSubCategoryName(e.target.value)} />

          <TextField style={{paddingBottom: '11px'}} type="file" id="images" onChange={imageHandler}  variant="filled" />

          {image && <img style={{ height: '30%', width: '30%' , borderRadius:'9px' }} src={image} />}
          <LoginButton variant="contained" onClick={addsubSubCategory}>
            Add SubSubCategory
          </LoginButton>
        </Wrapper>
        </div>
   </>
  )
}

export default AddSubSubCategory
import React, { useState } from 'react'
import { Header } from '../../components'
import DataTable from 'react-data-table-component';
import { useEffect } from 'react';
import HttpClient from '../../components/HttpClient';
import toast from 'react-hot-toast'
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


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

const Category = () => {
    const [categoryData , setCategorydata] = useState('');
    const [categoryName , setCategoryName] = useState('');
    const [ image , setImage] = useState('');
    const [preview , setPreview] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        fetchCategoryData();
    })

    const onDelete = async(id) => {
        console.log("ID" , id);
        let endPoint = `deleteCategory/${id}`
        let result = await HttpClient.requestData(endPoint , "DELETE");
        console.log("Delete", result);
        if(result && result.status){
            toast.success(result.message);
            fetchCategoryData();
        }else{
            toast.error(result.message)
        }
    }

    const onEdit = (id , categoryData , img) => {
        setCategoryName(categoryData);
        setPreview(img)
    }

    const addSubCategory = (categoryId) =>{
        navigate('/sub-category/'+categoryId)
    }
    const fetchCategoryData = async() => {
        let result  = await HttpClient.requestData("viewCategory", "GET");
        // console.log("CategoryData" , result);
        try {
            if(result && result.status){
                let arr = result.data.map((item , index) => {
                     return{
                         sl:index+1,
                         categoryName:item?.catName,
                        //  categoryImage:(
                        //     <img style={{ height: '80%', width: '80%' }} src={item.img} />
                        //  ),
                         edit:(
                            <Button
                            style={{ color: 'white', backgroundColor: 'blue' }}
                            title="Edit"
                            onClick={() => onEdit(item._id,item?.catName,item?.img)}
                            variant="outlined"
                            startIcon={<EditIcon />}
                          ></Button>
                        // <i class="fa-thin fa-pen-to-square"></i>
                         ),
                         delete:(
                            <Button
                            style={{ color: 'white', backgroundColor: 'red' }}
                            title="Delete"
                            onClick={() => onDelete(item._id)}
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                          ></Button>
                         ),
                         subcategory:(
                            <button onClick={() => addSubCategory(item._id)}>AddSubCat</button>
                         )
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
            name:  <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>SL</div>,
            selector: row => row.sl,
    
        },

        // {
        //     name: <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>Image</div>,
        //     selector: row => row.categoryImage,
        // },
        {
            name: <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>Category Name</div>,
            selector: row => row.categoryName,
        },
        {
            name: <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>Edit</div>,
            selector: row => row.edit,
        },
        {
            name: <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>Delete</div>,
            selector: row => row.delete,
        },
        {
            name: <div style={{ fontSize:'14px' , fontWeight:'bolder'}}>Add SubCategory</div>,
            selector: row => row.subcategory,
        },
    ];

    const imageHandler = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(URL.createObjectURL(e.target.files[0]));
        // setImage(e.target.files[0]);
    }

    const addCategory = async() => {

        console.log("Image" , image);
        let categoryData = {
            catName: categoryName,
            img: image
        }
        console.log("kaka" , categoryData);


        let result = await HttpClient.requestData("addCategory" , "POST" , categoryData);
        console.log("Category", result);
        if(categoryName && image){
            if(result && result.status){
                toast.success(result.message);
                let file = document.querySelector('#images');
                file.value= '';
                setPreview('');
                setCategoryName('');
                fetchCategoryData()
            }else{
                toast.error(result.message);
            }
        }else{
            toast.error("All Fields Are Required");
        }

    }
    
  return (
    <>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Category" />
            <Wrapper>
            <TextField type="text"  label="Category Name" value={categoryName} variant="filled" onChange={(e) => setCategoryName(e.target.value)} />
          {/* <Typography>Upload an Image *</Typography> */}
          <TextField style={{paddingBottom: '11px'}} type="file" id="images" onChange={imageHandler}  variant="filled" />

          {preview && <img style={{ height: '50%', width: '50%' }} src={preview} />}
          <LoginButton variant="contained" onClick={addCategory}>
            Add Category
          </LoginButton>
        </Wrapper>
        </div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="View All Category List" />
            <DataTable columns={columns} data={categoryData} pagination/>
        </div>
    </>

  )
}

export default Category
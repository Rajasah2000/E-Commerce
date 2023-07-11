import React, { useState } from 'react'
import { Header } from '../../components'
// import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import HttpClient from '../../components/HttpClient';
import { useLocation } from 'react-router-dom';

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
const EditColor = () => {
    const [colorName , setColorName] = useState('');
    const [colorCode , setColorCode] = useState('') ;
    const [id , setId] = useState('');

    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/edit-color'){
            setColorName(location?.state?.name);
            setColorCode(location?.state?.colorCode);
            setId(location?.state?._id)
        }
    } , []);

    const editColor = async(e) => {
      e.preventDefault()
        let data = {
            name:colorName,
            colorCode: colorCode
        }

        let endpoint = `update-Color/${id}`

        if(colorName && colorCode) {
            let result = await HttpClient.requestData(endpoint, "PUT" , data);
            console.log('EditCOlor' , result);
            if(result && result?.status) {
                toast.success(result?.message);
                setColorName("");
                setColorCode("");
            }else{
                toast.error(result?.message)
            }
        }else{
            toast.error("All Fields Are Required");
        }
    }
  return (
    <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Edit Color" />
            {/* <Wrapper>

            <TextField type="text"  label="Color Name"  value={colorName}  onChange={(e) => setColorName(e.target.value)} />

            <TextField type="text"  label="Color Code" value={colorCode}  onChange={(e) => setColorCode(e.target.value)} />

          <LoginButton variant="contained" onClick={editColor}>
            Edit Color
          </LoginButton>
        </Wrapper> */}


<form>
<div class="form-group">
    <label for="exampleInputEmail1" style={{marginBottom:'12px'}}>Color Name</label>
    <input type="email" value={colorName} onChange={(e) => setColorName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Color Name"/>
  </div>

  <div class="form-group" style={{marginBottom:'20px'}}>
    <label for="exampleInputEmail1" style={{marginBottom:'12px'}}>Color Code</label>
    <input type="email" value={colorCode} onChange={(e) => setColorCode(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Color code"/>
  </div>

  <button  class="btn btn-primary" onClick={editColor}>Edit Color</button>
  </form>

        </div>
    </>
  )
}

export default EditColor
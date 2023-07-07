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

const AddColor = () => {
    const [colorName , setColorName] = useState('');
    const [colorCode , setColorCode] = useState('') ;

    const addColor = async() => {
        let data = {
            name:colorName,
            colorCode: colorCode
        }

        if(colorName && colorCode) {
            let result = await HttpClient.requestData("add-Color", "POST" , data);
            console.log('COlor' , result);
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
            <Header title="Add Color" />
            <Wrapper>

            <TextField type="text"  label="Color Name"  value={colorName} variant="filled"  onChange={(e) => setColorName(e.target.value)} />

            <TextField type="text"  label="Color Code" value={colorCode} variant="filled"  onChange={(e) => setColorCode(e.target.value)} />

          <LoginButton variant="contained" onClick={addColor}>
            Add Color
          </LoginButton>
        </Wrapper>
        </div>
    </>
  )
}

export default AddColor
import React, { useState } from 'react'
import { Header } from '../../components'
import { useParams } from 'react-router-dom';
import { TextField, styled, Box, Button, Typography } from '@mui/material';

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

const SubCategory = () => {
    const [subCategoryName , setSubCategoryName]= useState('');
    const [preview , setPreview] = useState('');
    const [image , setImage] = useState('');

    const imageHandler = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.value);
    }

    const { id} = useParams();
    const addsubCategory = () => {
        let data = {
            categoryID:id,
            subcatName:subCategoryName,
            img:image
        }

        console.log("SubCategoryData" , data);
    }

  return (
    <>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header title="Add SubCategory" />
            <Wrapper>
            <TextField type="text"  label="SubCategory Name" value={subCategoryName} variant="filled" onChange={(e) => setSubCategoryName(e.target.value)} />

          <TextField style={{paddingBottom: '11px'}} type="file" id="images" onChange={imageHandler}  variant="filled" />

          {preview && <img style={{ height: '50%', width: '50%' }} src={preview} />}
          <LoginButton variant="contained" onClick={addsubCategory}>
            Add SubCategory
          </LoginButton>
        </Wrapper>
        </div>
    </>
  )
}

export default SubCategory
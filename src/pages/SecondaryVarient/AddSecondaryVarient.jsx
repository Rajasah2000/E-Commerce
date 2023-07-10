import React, { useState } from "react";
import { Header } from "../../components";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import HttpClient from "../../components/HttpClient";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField, styled, Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px 35px;
  & > div,padding-bottom: 12px;
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

const AddSecondaryVarient = () => {

    const [varientType , setVarientType] = useState('');
    const [varient , setVarient] = useState('');

const addVarient = async() => {
    let data = {
        varientType:varientType,
        varient:varient
    }
    if(varientType &&  varient){
      let result = await HttpClient.requestData("add-varientss" , "POST" , data);

      if(result && result?.status){
        toast.success(result.message);
        setVarientType("");
        setVarient("");
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
        
    <Header title="Add Secondary  Varient"/>
    <Wrapper>
      <TextField
        style={{ paddingBottom: "32px" }}
        type="text"
        label="Varient Type"
        value={varientType}
        variant="filled"
        onChange={(e) => setVarientType(e.target.value)}
      />

        <TextField
        style={{ paddingBottom: "32px" }}
        type="text"
        label="Varient "
        value={varient}
        variant="filled"
        onChange={(e) => setVarient(e.target.value)}
      />        

        <LoginButton variant="contained" onClick={addVarient} >
          Add Varient
        </LoginButton>
    </Wrapper>
  </div>
</>
  )
}

export default AddSecondaryVarient
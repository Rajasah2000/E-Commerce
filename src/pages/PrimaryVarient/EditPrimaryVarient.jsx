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

const EditPrimaryVarient = () => {

    const [varientType , setVarientType] = useState('');
    const [varient , setVarient] = useState('');
    const [id , setId]= useState('')
    const location = useLocation();
    

    const editVarient = async(e) => {
      e.preventDefault()

        let data = {
            varientType:varientType,
            varient:varient
        }

        let endpoint = `edit-Primary-varient/${id}`;

        if(varientType && varient ){

  
          let result = await HttpClient.requestData(endpoint , "PUT" , data);
  
          console.log("Result" , result);
  
          if(result && result?.status) {
              toast.success("Update Successfully");
              setVarientType('');
              setVarient('');
          }else{
              toast.error(result?.message);
          }
        }else{
          toast.error("All Fields Are Required")
        }
    }

    useEffect(() => {
      if(location?.pathname == '/edit-primary-varient'){
        setVarientType(location?.state?.varientType);
        setVarient(location?.state?.varient);
        setId(location?.state?._id);
      }
    },[])

  return (
    <>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        
        <Header title="Edit  Varient"/>
        {/* <Wrapper>
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

            <LoginButton variant="contained" onClick={editVarient} >
              Edit Varient
            </LoginButton>
        </Wrapper> */}


<form>
<div class="form-group">
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Varient Type : </label>
    <input type="email" value={varientType} onChange={(e) => setVarientType(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Brand Name"/>
  </div>

  <div class="form-group" style={{marginBottom:'21px'}}>
    <label for="exampleInputEmail1" style={{marginBottom:'12px' , fontSize:'15px'}}>Varient : </label>
    <input type="email" value={varient} onChange={(e) => setVarient(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Brand Name"/>
  </div>

  <button  class="btn btn-primary" style={{backgroundColor:'rgb(3, 201, 215)'}} onClick={editVarient}>Edit Varient</button>
  </form>


      </div>
   </>
  )
}

export default EditPrimaryVarient
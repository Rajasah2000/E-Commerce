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

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const [viewLoader , setViewLoader] = useState(false);



    const location = useLocation();
    useEffect(() => {

        if (location.pathname == "/edit-category") {
          console.log("DATA", location.state);
          setCategoryName(location.state?.catName);
          setImage(location.state?.image);
          setId(location.state?._id);
      }
    },[]);
  
    const imageHandler = async (e) => {
        let file = e.target.files[0];
        let data = new FormData();
        data.append("image", file);
        console.log("ImageData", data);
        let result = await HttpClient.fileUplode("upload-Cat-image", "POST", data);
        console.log("IMAGE", result);
    
        if (result && result.status) {
          toast.success("Image upload Successfully");
          setImage(result.image);
        } else {
          console.log("Uploading image error");
        }
      };

      const editCategory = async () => {
        setViewLoader(true)
        let categoryData = {
            catName: categoryName,
            image: image,
          };
        let endPoint = `updateCategory/${id}`
          console.log("EditCategory ", categoryData);
          if(categoryName && image){
            let result = await HttpClient.requestData(endPoint , "PUT" , categoryData);
            console.log("ResultEdit" , result);
            if(result && result.status){
                setViewLoader(false)
                toast.success(result.message);
                setCategoryName('');
                setImage('');
            }else{
                toast.error(result.message);
                setViewLoader(false)
            }
          }else{
            setViewLoader(false)
            toast.error("All Fields Are Required");
          }
      }
  return (
    <> {viewLoader ? <Loader/> : null}
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit Category"/>
        <Wrapper>
          <TextField
            style={{ paddingBottom: "32px" }}
            type="text"
            label="Category Name"
            value={categoryName}
            variant="filled"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {/* <Typography>Upload an Image *</Typography> */}
          <TextField
            type="file"
            id="images"
            onChange={imageHandler}
            variant="filled"
          />

          {image && <img style={{ height: "30%", width: "30%" }} src={image} />}
      
            <LoginButton variant="contained" onClick={editCategory}>
              Edit Category
            </LoginButton>
        </Wrapper>
      </div>
    </>
  )
}

export default EditCategory
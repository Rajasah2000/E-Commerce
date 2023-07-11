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

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [viewLoader , setViewLoader] = useState(false);

  const navigate = useNavigate();

  const EditCategory = (id) => {
    console.log("Id", id);
  };

  const imageHandler = async (e) => {
    // setPreview(URL.createObjectURL(e.target.files[0]));

    // setImage(URL.createObjectURL(e.target.files[0]));
    // setImage(e.target.files[0]);
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

  const addCategory = async (e) => {
    e.preventDefault();
    setViewLoader(true)
    let categoryData = {
      catName: categoryName,
      image: image,
    };
    console.log("kaka", categoryData);

    // console.log("Category", result);
    if (categoryName && image) {
      console.log("AAAAAAAAAAA");
      let result = await HttpClient.requestData(
        "addCategory",
        "POST",
        categoryData
      );
      console.log("Result", result);
      if (result && result.status) {
        setViewLoader(false)
        toast.success(result.message);
        let file = document.querySelector("#images");
        file.value = "";
        setImage("");
        setCategoryName("");
        // fetchCategoryData()
      } else {
        setViewLoader(false)
        toast.error(result.message);
      }
    } else {
      toast.error("All Fields Are Required");
      setViewLoader(false)
      console.log("BBBBBBBBBBBBB");
    }
  };

  return (
    <>
    {viewLoader ? <Loader/> : null}
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl" >  
        <Header title="Add Category"/>
        {/* <Wrapper>
          <TextField
            style={{ paddingBottom: "32px" }}
            type="text"
            label="Category Name"
            value={categoryName}
            variant="filled"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Typography>Upload an Image *</Typography>
          <TextField
            type="file"
            id="images"
            onChange={imageHandler}
            variant="filled"
          />

          {image && <img style={{ height: "30%", width: "30%" , borderRadius:'9px' }} src={image} />}
      
            <LoginButton variant="contained" onClick={addCategory}>
              Add Category
            </LoginButton>
        </Wrapper> */}
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1" style={{marginBottom:'12px'}}>Category Name</label>
    <input type="email" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Category Name"/>
  </div>
  <div class="mb-3">
  <label for="formFile" class="form-label">Upload Image</label>
  <input id="images" onChange={imageHandler} class="form-control" type="file" />
  {image && <img style={{ height: "30%", width: "30%" , marginTop:'12px' , borderRadius:'9px' }} src={image} />}
</div>
  <button  class="btn btn-primary" onClick={(e)=>addCategory(e)}>Add Category</button>
</form>
      </div>
    </>
  );
};

export default Category;

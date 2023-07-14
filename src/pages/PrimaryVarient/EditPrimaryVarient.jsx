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

const EditPrimaryVarient = () => {
  const [varientType, setVarientType] = useState("");
  const [varient, setVarient] = useState("");
  const [id, setId] = useState("");
  const location = useLocation();
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);
  const [subSubCategoryId, setSubSubCategoryId] = useState("");

  const editVarient = async (e) => {
    e.preventDefault();

    let data = {
      subsubcatId: subSubCategoryId,
      varientType: varientType,
      varient: varient,
    };

    let endpoint = `edit-Primary-varient/${id}`;

    if (varientType && varient && subSubCategoryId) {
      let result = await HttpClient.requestData(endpoint, "PUT", data);

      console.log("Result", result);

      if (result && result?.status) {
        toast.success("Update Successfully");
        setSubSubCategoryId("");
        setVarientType("");
        setVarient("");
      } else {
        toast.error(result?.message);
      }
    } else {
      toast.error("All Fields Are Required");
    }
  };

  useEffect(() => {
    fetchSubSubCategory();
    if (location?.pathname == "/edit-primary-varient") {
      setVarientType(location?.state?.varientType);
      setVarient(location?.state?.varient);
      setId(location?.state?._id);
      setSubSubCategoryId(location?.state?.subsubcatId);
    }
  }, []);

  const fetchSubSubCategory = async () => {
    let result = await HttpClient.requestData("viewSubSubCategory", "GET");

    if (result && result.status) {
      setSubSubCategoryData(result?.data);
    } else {
      toast.error("Failed to Fetch SubCategory Data");
    }
  };

  const handleSubSubCategory = (e) => {
    setSubSubCategoryId(e.target.value);
  };

  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Edit  Varient" />
        <form>
          <label style={{ marginBottom: "12px", fontSize: "15px" }} for="cars">
            Choose a sub sub category :
          </label>
          <select
            style={{ marginBottom: "21px" }}
            class="form-select"
            aria-label="select category"
            value={subSubCategoryId}
            onChange={(e) => handleSubSubCategory(e)}
          >
            <option value={""}>Select a subSubCategory.......</option>
            {subSubCategoryData.map((item) => {
              return (
                <option id={item?._id} value={item?._id}>
                  {item?.subSubCatName}
                </option>
              );
            })}
          </select>
          <div class="form-group">
            <label
              for="exampleInputEmail1"
              style={{ marginBottom: "12px", fontSize: "15px" }}
            >
              Varient Type :{" "}
            </label>
            <input
              type="email"
              value={varientType}
              onChange={(e) => setVarientType(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Brand Name"
            />
          </div>

          <div class="form-group" style={{ marginBottom: "21px" }}>
            <label
              for="exampleInputEmail1"
              style={{ marginBottom: "12px", fontSize: "15px" }}
            >
              Varient :{" "}
            </label>
            <input
              type="email"
              value={varient}
              onChange={(e) => setVarient(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Brand Name"
            />
          </div>

          <button
            class="btn btn-primary"
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
            onClick={editVarient}
          >
            Edit Varient
          </button>
        </form>
      </div>
    </>
  );
};

export default EditPrimaryVarient;

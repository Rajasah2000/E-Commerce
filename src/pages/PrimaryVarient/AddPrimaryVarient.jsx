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
const AddPrimaryVarient = () => {
  // const [varientType, setVarientType] = useState("");
  // const [varient, setVarient] = useState("");
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);
  const [subSubCategoryId, setSubSubCategoryId] = useState("");

  const [varientData, setVarientData] = useState([
    {
      varientType: "",
      varient: "",
    },
  ]);

  useEffect(() => {
    fetchSubSubCategory();
  },[]);

  const addVarient = async (e) => {
    e.preventDefault();

    let data = {
      subsubcatId: subSubCategoryId,
      details: varientData,
    };
    console.log("VarData", data);

    if (
      subSubCategoryId &&
      varientData[0].varientType != "" &&
      varientData[0].varient != ""
    ) {

      let result = await HttpClient.requestData("add-varient", "POST", data);
      console.log("VarientResult" , result);
      if (result && result?.status) {
        console.log("SSSSSSSSSSSSSSSSSSSS");
        toast.success(result.message);
        // setSubSubCategoryId("");
        // varientData[0].varientType
        // setVarientData((prv) => prv.varientType == "");
      } else {
        toast.error(result?.message);
      }
    } else {
      toast.error("All Fields Are Required");
    }
    console.log("Varient", data);
  };



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

  const changeHandler = (e, i) => {
    setVarientData((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[i][e.target.name] = e.target.value;
      return [...update];
    });
  };

  return (
    <>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
        <Header title="Add  Primary Varient " />

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

        {varientData.map((item, i) => {
          return (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    marginBottom: "21px",
                    border: "0.01px solid #dee2e6",
                    width: "70%",
                    padding: "13PX",
                  }}
                >
                  <div class="form-group">
                    <label
                      for="exampleInputEmail1"
                      style={{ marginBottom: "12px", fontSize: "15px" }}
                    >
                      Varient Type :{" "}
                    </label>
                    <input
                      type="email"
                      name="varientType"
                      value={item.varientType}
                      onChange={(e) => changeHandler(e, i)}
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
                      name="varient"
                      value={item.varient}
                      onChange={(e) => changeHandler(e, i)}
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Brand Name"
                    />
                  </div>
                </div>

                <button
                  class="btn btn-danger"
                  style={{ margin: "104px 88px", padding: "5px , 17px" }}
                  onClick={() => {
                    setVarientData((prv) => {
                      let update = JSON.parse(JSON.stringify(prv))
                      update.splice(i,1);
                      return update;
                    })

                  }}
                >
                  -
                </button>
              </div>
            </>
          );
        })}

        <button
          class="btn btn-warning logout-btn"
          onClick={() => {
            setVarientData((prev) => {
              let update = JSON.parse(JSON.stringify(prev));
              update.push({
                name: "",
                age: "",
              });
              return [...update];
            });
          }}
        >
          +
        </button>
      </div>
   
      <button
        class="btn btn-primary"
        style={{ backgroundColor: "rgb(3, 201, 215)" }}
        onClick={addVarient}
      >
        Add Varient
      </button>

    </>
  );
};

export default AddPrimaryVarient;

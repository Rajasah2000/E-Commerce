import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Login from "./pages/Login";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import Category from "./pages/Category/Category";
import ManageCategory from "./pages/Category/ManageCategory";
import SubCategory from "./pages/SubCategory/SubCategory";
import EditCategory from "./pages/Category/EditCategory";
import ManageSubCategory from "./pages/SubCategory/ManageSubCategory";
import AddSubSubCategory from "./pages/SubSubCategory/AddSubSubCategory";
import ManageSubSubCategory from "./pages/SubSubCategory/ManageSubSubCategory";
import EditSubCategory from "./pages/SubCategory/EditSubCategory";
import EditSubSubCategory from "./pages/SubSubCategory/EditSubSubCategory";
import AddProduct from "./pages/Product/AddProduct";
import ManageProduct from "./pages/Product/ManageProduct";
import AddSecondaryVarient from "./pages/SecondaryVarient/AddSecondaryVarient";
import ManageSecondaryVarient from "./pages/SecondaryVarient/ManageSecondaryVarient";

import AddColor from "./pages/Color/AddColor";
import ManageColor from "./pages/Color/ManageColor";
import EditColor from "./pages/Color/EditColor";

import AddUnit from "./pages/Unit/AddUnit";
import ManageUnit from "./pages/Unit/ManageUnit";
import EditUnit from "./pages/Unit/EditUnit";

import AddBrand from "./pages/Brand/AddBrand";
import ManageBrand from "./pages/Brand/ManageBrand";
import EditBrand from "./pages/Brand/EditBrand";

import AddPrimaryVarient from "./pages/PrimaryVarient/AddPrimaryVarient";
import ManagePrimaryVarient from "./pages/PrimaryVarient/ManagePrimaryVarient";

import EditPrimaryVarient from "./pages/PrimaryVarient/EditPrimaryVarient";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
// import EditSecondaryVa

import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import { useStateContext } from "./contexts/ContextProvider";

const Dashboard = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  // const location = useLocation();

  const logOut = () => {
    alert("Are you really want to logout ?");
    reactLocalStorage.remove('adminData');
    reactLocalStorage.remove('loginStatus');
    navigate('/login');
  }

  const navigate = useNavigate();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="TopCenter">
          <button
            type="button"
            style={{ borderRadius: "50%", backgroundColor: currentColor }}
            className="text-3xl p-3 text-white hover:drop-shadow-xl hover:bg-light-gray"
            onClick={() => setThemeSettings(true)}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">{/* <Sidebar /> */}</div>
      )}

      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
              ${activeMenu ? "md:ml-72" : " flex-2"}
              `}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full" style={{zIndex:"-20px" , display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
          <Navbar />
          <button onClick={logOut} type="button" class="btn btn-warning logout-btn" style={{ marginRight:'21px'}} >Logout</button>
        </div>
        
        <div>
          {/* {themeSettings && <ThemeSettings />} */}

          <Routes>
            {/* dashboard  */}
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/" element={<Ecommerce />} />
            <Route path="/ecommerce" element={<Ecommerce />} />

            <Route path="/category" element={<Category/>}/>
            <Route path="/manage-category" element={<ManageCategory/>}/>
            <Route path="/edit-category" element={<EditCategory/>}/>
            
            <Route path="/sub-category" element={<SubCategory/>}/>
            <Route path="/manage-sub-category" element={<ManageSubCategory/>}/>
            <Route path="/edit-sub-category" element={<EditSubCategory/>}/>

            
            <Route path="/add-sub-sub-category" element={<AddSubSubCategory/>}/>
            <Route path="/manage-sub-sub-category" element={<ManageSubSubCategory/>}/>
            <Route path="/edit-sub-sub-category" element={<EditSubSubCategory/>}/>

            
            <Route path="/add-color" element={<AddColor/>}/>
            <Route path="/manage-color" element={<ManageColor/>}/>
            <Route path="/edit-color" element={<EditColor/>}/>

            <Route path="/add-brand" element={<AddBrand/>}/>
            <Route path="/manage-brand" element={<ManageBrand/>}/>
            <Route path="/edit-brand" element={<EditBrand/>}/>
            
            
            <Route path="/add-product" element={<AddProduct/>}/>
            <Route path="/manage-product" element={<ManageProduct/>}/>

            <Route path="/add-unit" element={<AddUnit/>}/>
            <Route path="/manage-unit" element={<ManageUnit/>}/>
            <Route path="/edit-unit" element={<EditUnit/>}/>


            <Route path="/add-primary-varient" element={<AddPrimaryVarient/>}/>
            <Route path="/manage-primary-varient" element={<ManagePrimaryVarient/>}/>
            <Route path="/edit-primary-varient" element={<EditPrimaryVarient/>}/>
            


            <Route path="/add-secondary-varient" element={<AddSecondaryVarient/>}/>
            <Route path="/manage-secondary-varient" element={<ManageSecondaryVarient/>}/>
            <Route path="/edit-secondary-varient" element={<ManageSecondaryVarient/>}/>

            {/* pages  */}
            <Route path="/orders" element={<Orders />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />

            {/* apps  */}
            {/* <Route path="/kanban" element={<Kanban />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/color-picker" element={<ColorPicker />} /> */}

            {/* charts  */}
            {/* <Route path="/line" element={<Line />} />
            <Route path="/area" element={<Area />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/color-mapping" element={<ColorMapping />} />
            <Route path="/pyramid" element={<Pyramid />} />
            <Route path="/stacked" element={<Stacked />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

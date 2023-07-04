import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import PopupState from "@mui/icons-material";
// import { Link } from "react-router-dom";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const [show, setShow] = useState({ heading: false });
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const clickHandler = (e) => {
    // console.log(e.target.getAttribute('name'));
    let a = e.target.getAttribute('name')
    setShow(prev => {
      let update = {...prev}
      update[a] = !update[a]
      return {...update}
    })
  }

  const activeLink =
    " flex items-center gap-5 pl-4 py-2.5 rounded-lg text-white text-md m-2 ";

  const normalLink =
    " flex items-center gap-5 pl-4 py-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Ecommerce App</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {/* {links.map((item, i) => (
              <div key={i}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({isActive}) => ({
                      backgroundColor:  isActive ?  currentColor : ''
                    }) }
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))} */}

            {/* <div className="panel panel-default metismenu vertical-nav-menu">
              <div
                className="panel-heading metismenu-container"
                role="tab"
                id="headingTwentySeven"
              >
                <div className="panel-title metismenu-item">
                  <a
                    className="collapsed metismenu-link"
                    role="button"
                    data-toggle="collapse"
                    data-parent="#accordionMenu"
                    href="#collapseTwentySeven"
                    aria-expanded="true"
                    aria-controls="collapseTwentySeven"
                  >
               
                    <i
                      class="metismenu-icon fa fa-users"
                      aria-hidden="true"
                    ></i>
                    Activity Participants
                  </a>
                </div>
              </div>
              <div
                id="collapseTwentySeven"
                className="panel-collapse collapse"
                role="tabpanel"
                aria-labelledby="headingTwentySeven"
              >
                <div className="panel-body">
                  <ul className="metismenu-container">
                    <li className="metismenu-item">
                      <Link to="/add-participants" className="metismenu-link">
                        Add Participants
                      </Link>
                    </li>
                    <li className="metismenu-item">
                      <Link
                        to="/manage-participants"
                        className="metismenu-link"
                      >
                        Manage Participants
                      </Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            {/* </div> */}
            {/* <PopupState variant="popover" popupId="demo-popup-menu">
  {(popupState) => (
    <React.Fragment>
      <Button variant="contained" {...bindTrigger(popupState)}>
        Dashboard
      </Button>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Profile</MenuItem>
        <MenuItem onClick={popupState.close}>My account</MenuItem>
        <MenuItem onClick={popupState.close}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )}
</PopupState>  */}
            <div>
              <div style={{ cursor:'pointer' }} name='heading' onClick={clickHandler}>Category</div>

              {show.heading && (
                <div style={{ display: "flex" , flexDirection:'column'}}>
                  <Link>Add Category</Link>
                  <Link>Manage Category</Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;

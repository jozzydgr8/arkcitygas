
import { NavLink, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UseDataContext } from "../context/UseDataContext";
import { FlatButton } from "./FlatButton";
import { UseAuthContext } from "../context/UseAuthContext";



export const OffcanvasNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {dispatch} = UseDataContext();
  const navigate = useNavigate();
  const {dispatch:handle, user} =UseAuthContext();
  const handleNavLinkClick = () => {
  const dismissButton = document.querySelector(
    '#offcanvasNavbar [data-bs-dismiss="offcanvas"]'
  ) as HTMLElement | null;

  if (dismissButton) {
    dismissButton.click(); 
  }
};

 // Runs when route changes

 const handleLogOut = ()=>{
  if (!user){ return}
    localStorage.removeItem('user');
    handle({type:'logout'});
    dispatch({type:'getOrders', payload:null});
 }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/admin_jctbdil1$" >
          ArkCity Gas
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              ArkCity Gas
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/admin_jctbdil1$"onClick={handleNavLinkClick}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin_jctbdil1$/manageorders"onClick={handleNavLinkClick}>
                  Manage Orders
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  More
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      onClick={handleNavLinkClick}
                      className="dropdown-item"
                      to="/admin_jctbdil1$/product/addproduct"
                    >
                      Add New Product <PlusOutlined />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="#" onClick={handleNavLinkClick}>

                      Send News Letter
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin_jctbdil1$/adminrequest" onClick={handleNavLinkClick}>
                      Admin Request
                    </NavLink>
                  </li>
                  {
                    user && (
                      <li>
                        <NavLink className="dropdown-item" to="#" 
                         onClick={() => {
                          handleNavLinkClick();
                          handleLogOut();
                        }}>
                          Log Out
                        </NavLink>
                      </li>
                    )
                  }
                </ul>
              </li>
            </ul>
          
            <form className="d-flex mt-3" role="search">
              
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for Orders Using OrderId "
                aria-label="Search"
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" title="search" onClick={(e)=>{
                e.preventDefault();
                dispatch({type:'searchQuery', payload:searchQuery});
                navigate('/admin_jctbdil1$/manageorders');
                handleNavLinkClick();
              }}>Submit</button>
               
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

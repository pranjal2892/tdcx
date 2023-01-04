import React from "react";
import Avatar from '@mui/material/Avatar';
import "./index.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../redux/action";

export default function Headers() {
    const navigator = useNavigate();
    const name= useSelector((state) => state.userData.userName)
    const dispatch = useDispatch()
    const logout = ()=>{
        dispatch(clearUserData());
        // localStorage.clear();
        navigator('/');
    }


    const getInitials = (name) => {
      var names = name.split(' '),
          initials = names[0].substring(0, 1).toUpperCase();

      if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      return initials;
  };

  return (
    <>
        <div className="header_card">
            <div className="header_elements">
                <div><Avatar sx={{ width: 50, height: 50 }} src="/icon1.png">{getInitials(name)}</Avatar></div>
                <div className="New_Task_font_style" style={{}}> {name}</div>
            </div>
            <div className="header_elements">
                <span className="New_Task_font_style" style={{margin: "12px", fontSize: "20px",cursor:'pointer'}} onClick={logout}>Logout</span>
            </div>
        </div> 
    </>
   
  );
}
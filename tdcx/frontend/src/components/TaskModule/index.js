import React from "react";
import Button from '@mui/material/Button';
import AddNewTaskDialog from '../NewTaskModule/index';
import "./index.css";
import { useNavigate } from "react-router-dom";
import Headers from "../Headers";


export default function AddNewTask() {
    const [open, setOpen] = React.useState(false);
    const navigator = useNavigate();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      navigator("/tasklist");
      navigator(0);
    };

  return (
    <>
        <Headers/>
        <div className="newTask_card"> 
            <div className="newTask_label">
                You have no task .
            </div> 
            <div className="button_display">
                <Button className="addTask_button" variant="contained" onClick={handleClickOpen}>+ New Task</Button>
            </div>
        </div>
        <AddNewTaskDialog
            open={open}
            onClose={handleClose}
        />
    </>
   
  );
}
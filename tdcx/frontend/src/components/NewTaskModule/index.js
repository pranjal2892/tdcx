import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function AddNewTaskDialog(props) {
  const { onClose, open } = props;
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const userid= useSelector((state) => state.userData.userId)

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks/getByUser`;
    axios
      .post(`${baseUrl}`, 
        // { userId: localStorage.getItem("userId") }
        { userId: userid  }
      )
      .then((response) => {
        setTaskList(response?.data?.tasks);
      });
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = () => {
    const baseURL = `${process.env.REACT_APP_BASE_URL}/tasks/create`;
    axios
      .post(`${baseURL}`, {
        // user: localStorage.getItem("userId"),
        user: userid,
        taskName: taskName,
      })
      .then((response) => {
        onClose();
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <div className="New_Task_font_style">+ New Task!</div>
      <div>
        <TextField
          className="login_textfield"
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          onChange={handleTaskName}
          type="text"
          value={taskName}
          name="taskName"
          required
        />
      </div>
      <div className="button_display_dialog">
        <Button
          className="addTask_button_dialog"
          variant="contained"
          onClick={handleSubmit}
        >
          + New Task
        </Button>
      </div>
    </Dialog>
  );
}

AddNewTaskDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

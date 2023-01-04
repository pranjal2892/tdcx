import React, {useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EditNewTaskDialog(props) {
  const {
    editDetails
  }= props;

  const { onClose, open } = props;
  const [taskName, setTaskName] = useState(editDetails.taskName);
  const userid= useSelector((state) => state.userData.userId)

  const handleClose = () => {
    onClose();
  };

  const handleTaskName = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = () => {
    const baseURL = `${process.env.REACT_APP_BASE_URL}/tasks/update`;
    axios
      .patch(`${baseURL}/${editDetails._id}`, {
        // user: localStorage.getItem("userId"),
        user : userid,
        taskName: taskName,
      })
      .then((response) => {
        onClose();
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <div className="New_Task_font_style">Edit Task!</div>
      <div>
        <TextField
          className="login_textfield"
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          onChange={handleTaskName}
          type="text"
          defaultValue={editDetails.taskName}
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
          Edit Task
        </Button>
      </div>
    </Dialog>
  );
}



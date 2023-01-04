import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import AddNewTaskDialog from "../NewTaskModule/index";
import EditNewTaskDialog from "./EditNewTaskDialog"
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TaskListCompletion from "../Charts";
import SearchIcon from '@mui/icons-material/Search';
import CircleIcon from '@mui/icons-material/Circle';
import InputAdornment from '@mui/material/InputAdornment';
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddNewTask from "../TaskModule";
import Headers from "../Headers";
import { useSelector } from "react-redux";


export default function TaskList() {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [count,setCount] =React.useState(0);
  const [editDetails, setEditDetails] = React.useState(0);
  const navigator = useNavigate();

  const userid= useSelector((state) => state.userData.userId)

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks/getByUser`;
    axios
      .post(`${baseUrl}`, { userId: userid })
      .then((response) => {
        setTaskList(response?.data?.tasks);

        const count = response?.data?.tasks.filter((obj) => obj.isComplete === 1).length;
        setCount(count);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigator("/tasklist");
    navigator(0);
  };


  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = (value) => {
    setEditOpen(false);
    navigator("/tasklist");
    navigator(0);
  };

  const deleteTask = (taskId) => {
    const deleteURL = `${process.env.REACT_APP_BASE_URL}/tasks/delete`;
    axios.delete(`${deleteURL}/${taskId}`).then((response) => {
      navigator("/tasklist");
      navigator(0);
    });
  };

  const handleEdit = (taskId) => {
    const editURL = `${process.env.REACT_APP_BASE_URL}/tasks/get`;
    axios.get(`${editURL}/${taskId}`).then((response) => {
      setEditDetails(response.data.task);
      console.log(response.data.task);
      handleEditClickOpen();
    });
  }

  const handleComplete = (taskId) => {
    const updateURL = `${process.env.REACT_APP_BASE_URL}/tasks/update`;
    axios.patch(`${updateURL}/${taskId}`,{
      isComplete: 1,
  }).then((response) => {
    navigator(0);
  })
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
    const baseSearchURL = `${process.env.REACT_APP_BASE_URL}/tasks/search`;

    event.currentTarget.value !== "" ? 
    axios
      .get(`${baseSearchURL}/${event.currentTarget.value}`)
      .then((response) => {
        setTaskList(response?.data?.tasks);
      })
      .catch((error) => {
        alert(error.message);
      })
    : 
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/tasks/getByUser`, 
        // { userId: localStorage.getItem("userId") }
        { userId: userid }
      )
      .then((response) => {
        setTaskList(response?.data?.tasks);
        const count = response?.data?.tasks.filter((obj) => obj.isComplete === 1).length;
        setCount(count);
      });
  };

  return (
    <>
      {taskList.length > 0 ? (
        <>
         <Headers/>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item>
                  <Paper
                    sx={{
                      height: 140,
                      width: 250,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <div className="paper_div">
                      <div className="task_div">Task Completed</div>
                      <div><span style={{fontSize: "65px", color: "#0043ffa3"}}>{count}</span>
                            <span style={{fontSize: "25px"}}>/</span>
                            <span style={{fontSize: "25px"}}>{taskList.length}</span>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper
                    sx={{
                      height: 140,
                      width: 250,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <div className="paper_div">
                      <div className="task_div">Latest Created Task</div>
                      <div className="taskname_div">
                        <List>
                          {taskList.map((item) => {
                            return (
                              <ListItem disablePadding>
                                <ListItemIcon>
                                  <CircleIcon style={{transform:"scale(0.4)"}}/>
                                </ListItemIcon>
                                <ListItemText className ={item.isComplete===1?'textstyle_list':""}>{item.taskName}</ListItemText>
                              </ListItem>
                            );
                          })}
                        </List>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid item>
                  <Paper
                    sx={{
                      height: 140,
                      width: 250,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    <div className="paper_div">
                      <TaskListCompletion className="chart_list" count={count} taskList={taskList} />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className="search_div">
            <div className="font_list">Tasks</div>
            <div
              style={{
                display: "flex",
                width: "70%",
                justifyContent: "flex-end",
              }}
            >
              <TextField
                className="login_TF_list"
                id="outlined-basic"
                label="SearchText"
                variant="outlined"
                onChange={handleChange}
                value={keyword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="button_display_list">
                <Button
                  className="addTask_button_list"
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  + New Task
                </Button>
              </div>
              <AddNewTaskDialog open={open} onClose={handleClose} />
            </div>
          </div>

          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={12}>
                <Grid item>
                  <Paper
                    sx={{
                      height: 300,
                      width: 900,
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                  >
                    {taskList.map((item) => {
                      return (
                        <>
                          <div style={{ display: "flex", padding: "15px" }}>
                            <div style={{ width: "50%" }}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onClick={() => handleComplete(item._id)}
                                      defaultChecked={item.isComplete===1?true:false}
                                    />
                                  }
                                  label={<div className={item.isComplete===1?'textstyle_list tasklist_div':"tasklist_div"}>{item.taskName}</div>}
                                />
                              </FormGroup>
                            </div>
                            <div
                              style={{
                                width: "50%",
                                textAlign: "right",
                                marginTop: "5px",
                              }}
                            >
                              <ModeEditIcon
                                style={{ color: "grey", margin: "5px", cursor:"pointer" }}
                                onClick={() => handleEdit(item._id)}
                              />
                              <EditNewTaskDialog editDetails = {editDetails} open={editOpen} onClose={handleEditClose} />
                              <DeleteIcon
                                style={{
                                  color: "grey",
                                  margin: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteTask(item._id)}
                              />
                            </div>
                          </div>
                          <Divider variant="middle" />
                        </>
                      );
                    })}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <AddNewTask />
      )}
    </>
  );
}

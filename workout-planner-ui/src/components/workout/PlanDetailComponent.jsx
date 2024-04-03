import { Box, Button, Modal } from "@mui/material";

import axios from "axios";
import { useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import EditWorkoutForm from "./EditWorkForm";
import Comments from "../comments/Comments";
import './PlanDetail.css';
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor:'white',
    border: '2px solid white',
    boxShadow: 30,
    p: 2,
    borderRadius:'10px'
  };
function PlanDetailComponent(params) {
  console.log(params.workout.workout_date);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const  workoutId= useParams()
    const navigate = useNavigate();
    const path = useLocation()
    const headers = {
        'Content-Type': 'text/plain'
    };
    const location = useLocation()
    console.log(location);
    const urlPath = 'http://localhost:3000/workout/'+params.workout.workout.id;
    const deleteThisWOrkout = async () =>{
            try{
              const response =   await axios.delete(urlPath, {
                headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            },{ crossdomain: true },{headers})
              console.log(response.data);
              navigate('/myplan', {replace: true})
            }catch(e){
                    console.log("Error ");
            }
    }
    const goBack = () =>{
      console.log(workoutId);
      let backPath = path.pathname.slice(0,path.pathname.lastIndexOf("/"))
      console.log(backPath);
      if(backPath===""){
        navigate('/')
      }else{
        navigate(backPath)
      }
    }
    return<div className="detailPage">
      <Button onClick={goBack}>Go Back</Button>
    <p><b>Title: </b>{params.workout.workout.title}</p>
    <p><b>Description:</b>{params.workout.workout.workout_desc}</p>
    <p><b>Type:</b>{params.workout.workout.workout_type}</p>
    <p><b>Date:</b> {params.workout.workout.workout_date}</p>
     
    {params.workout.canEdit === true && params.workout.canDelete ===true ? <div>
    <Button onClick={deleteThisWOrkout}>Delete</Button>
    <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <EditWorkoutForm setOpen = {setOpen} workout={params.workout.workout}  planDetail={params.planDetail}/>
                </Box>
     </Modal>
    </div> : null}
     <Comments workout={params.workout.workout}/>
    </div>
}

export default PlanDetailComponent;
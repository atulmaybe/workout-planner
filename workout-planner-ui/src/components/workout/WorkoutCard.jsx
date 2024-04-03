import { Link, useLocation } from "react-router-dom";
import './WorkoutCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box,  Modal } from "@mui/material";
import { useState } from "react";
import AssignForm from "./AssignForm";
const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor:'white',
  border: '2px solid white',
  boxShadow: 30,
  p: 2,
  borderRadius:'10px'
};
function WorkoutCard(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const path = useLocation()
    return (
        <Card sx={{ minWidth: 295 }} className='child  contentCard'>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.workout.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.workout.workout_desc}
          </Typography>
          <div className="detailbtn1">
          {
            path.pathname==='/' ?  <Link to={`/${props.workout.id}`} params={{workoutId:props.workout.id}} className="detailbtn">Details</Link> : null
          }
          {
            path.pathname==='/myplan' ?<Link to={`/myplan/${props.workout.id}`} params={{workoutId:props.workout.id}} className="detailbtn">Details</Link> : null
          }
          {
            path.pathname==='/assignedplans' ?<Link to={`/assignedplans/${props.workout.id}`} params={{workoutId:props.workout.id}} className="detailbtn">Details</Link> : null
          }
          
          </div>
          { props.canAssign===true && localStorage.getItem('userId')=== String(props.workout.user_id) ?
          <div className="detailbtn2">
            <button onClick={handleOpen} className="detailbtn detailbtn3">Assign this workout</button>
              <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <AssignForm setOpen = {setOpen} workout={props.workout} />
                    </Box>
              </Modal></div> : null }
        </CardContent>
      </Card>
      )
}
export default WorkoutCard;
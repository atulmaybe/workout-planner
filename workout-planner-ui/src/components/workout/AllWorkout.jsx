import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import axios from "axios";
import { Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import Spinner from "./Spinner";
function AllWorkout(props) {
    const [workouts, setWorkouts] = useState({})
    const [ spinner, setSpinner] = useState( true); 
    const location = useLocation()
    useEffect(()=>{
      if(localStorage.getItem("token")){
        fetchAllContent()
      }
    },[]);
    const fetchAllContent  = async () =>{
      try{
        const response = await axios
          .get('http://localhost:3000/allworkouts', 
          {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        },{ crossdomain: true }
      )
      setWorkouts(response.data)
      setSpinner(false)
      } catch (error){
        console.log(error);
      }
    }
    return <div> { !spinner?
        <div> {
            Object.keys(workouts).length  >0 ? <div className='parent'>{workouts.map((workout) =>  <WorkoutCard workout={workout.workout}  key={workout.workout.id} path={location.pathname} canAssign={workout.canAssign} />)}
            </div>: <Alert severity="info">There is no public workout plan yet!</Alert>
            }
        </div>:<Spinner /> } </div>
}
export default AllWorkout;
import axios from "axios";
import { useEffect, useState } from "react";
import WorkoutCard from "../components/workout/WorkoutCard";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import Spinner from "../components/workout/Spinner";

const AssignedPlan = (props) =>{
    const path = useParams()
    const [ spinner, setSpinner] = useState( true); 
    const [assignedworkouts, setAssignedWorkouts] = useState({})
    useEffect(()=>{
      fetchAllContent()
    },[]);
    const fetchAllContent  = async () =>{
      try{
        const response = await axios
          .get( 'http://localhost:3000/assignedWorkouts', {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        },{ crossdomain: true }
      )
      //setContents(response.data);
      console.log(response.data);
      setAssignedWorkouts(response.data)
      setSpinner(false)
      } catch (error){
        console.log(error);
      }
    }
    return <> {!spinner ?
        <div className="myworkout">
        <h2>Assigned Plans</h2>
        {
            Object.keys(assignedworkouts).length >0  ? <div className='parent'>{assignedworkouts.map((workout) =>  <WorkoutCard key={workout.id} workout={workout} path={path} />)}
            </div>: <Alert severity="info">No plans has been assigned to you!</Alert>
        }
        </div>: <Spinner /> }
    </>
}

export default AssignedPlan;
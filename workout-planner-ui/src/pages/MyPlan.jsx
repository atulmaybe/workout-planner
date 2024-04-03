import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import WorkoutCard from "../components/workout/WorkoutCard";
import './MyPlan.css'
import { useParams } from "react-router-dom";
import Spinner from "../components/workout/Spinner";
function MyPlan(params) {
    const [myPlans, setMyPlans] =  useState({});
    const [ spinner, setSpinner] = useState( true); 
    const path = useParams()
    console.log(path);
    useEffect(()=>{
        fetchMyPlans()
    },[]);
    const fetchMyPlans = async () =>{
        try{
          const response = await axios
            .get('http://localhost:3000/myworkouts', {
                headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            },{ crossdomain: true }
        )
        //setContents(response.data);
        console.log(response.data);
        setMyPlans(response.data)
        setSpinner(false)
        } catch (error){
          console.log(error);
        }
      }
        return <div className="myworkout">
            { !spinner? 
            <div>
                <h2>My Workout Plans</h2>
                    {Object.keys(myPlans).length >0 ? <div className='parent'>{myPlans.map((workout) =>  <WorkoutCard workout={workout.workout}  key={workout.id} path={path}  canAssign={workout.canAssign}/>)}
                </div>: <Alert severity="info">You have not created any workout plans yet!</Alert>}
            </div> :<Spinner />
        }
        </div>
}
export default MyPlan;
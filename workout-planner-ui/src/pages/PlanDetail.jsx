import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlanDetailComponent from "../components/workout/PlanDetailComponent";
import axios from "axios";

function PlanDetail () {
    const [workout, setWorkout] = useState(null)
    const params = useParams();
    let urlPath = 'http://localhost:3000/workout/'+params.workoutId;
    useEffect(()=>{
        fetchAllContent()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
      const fetchAllContent  = async () =>{
        try{
          const response = await axios
            .get(urlPath, {
              headers: {
              'Authorization': `${localStorage.getItem('token')}`
            }
          },{ crossdomain: true }
        )
        //setContents(response.data);
        console.log(response.data);
        setWorkout(response.data)
        } catch (error){
          console.log(error);
        }

    }
    return <>
        {workout? <PlanDetailComponent workout={workout} planDetail={fetchAllContent}/> : <p>Loading....</p>}
    </>
};

export default PlanDetail;
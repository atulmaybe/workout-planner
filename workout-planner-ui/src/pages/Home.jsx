import AllWorkout from "../components/workout/AllWorkout";
import { useNavigate } from "react-router-dom";
import './MyPlan.css';
import { useEffect } from "react";
function Home(params) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() =>{
        if (token==null){
            return navigate('/login')
        }
    });
    return <div className="myworkout">
        <h2>All Workouts</h2>
        <AllWorkout />
    </div>
}

export default Home;
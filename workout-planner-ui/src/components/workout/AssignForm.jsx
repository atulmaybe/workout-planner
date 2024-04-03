import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import './AddWorkoutForm.css'
const AssignForm = (props) =>{
    const [assinWorkout, setAssignWorkout] = useState(
        {
            "assigned_to": "",
             "assigned_by": localStorage.getItem('userEmail'),
             "user_id":localStorage.getItem('userId'),
             "workout_id":props.workout.id
        }
    ) 
    const closeModel = () =>{
        props.setOpen(false)
    }
    const handleInputChange = (event) =>{
        console.log(event.target.value);
        const { name, value } = event.target;
        setAssignWorkout((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(assinWorkout);
        assinWorkout.user_id=localStorage.getItem('userId')
        assinWorkout.assigned_by=localStorage.getItem('userEmail')
        axios.post('http://localhost:3000/workout/assign', assinWorkout, {
            headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        }).then((res)=>{
            console.log(res.data);
            closeModel()
        }).catch((error) =>{
            console.log(error);
        })
    }
    return <>
        <div className='formhead'><p className='formTitle'>Assign the Plan  </p><Button onClick={closeModel}>Close</Button></div>
        <form  onSubmit={handleSubmit}>
            <br />
            <input type="email" name="assigned_to"  placeholder='Email' value={assinWorkout.assigned_to} onChange={handleInputChange} required/>
            <br /><input type="submit" value="Submit" />
             <Button onClick={closeModel}>Cancel</Button>
        </form>
    </>
}

export default AssignForm;
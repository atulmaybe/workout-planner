import axios from 'axios';
import './AddWorkoutForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Button } from '@mui/material';
function EditWorkoutForm(params) {
    const url = 'http://127.0.0.1:3000/workout/'+params.workout.id
    const navigate = useNavigate()
    const [workout, setWorkout] = useState({
        title: params.workout.title,
        workout_desc:params.workout.workout_desc,
        workout_type:params.workout.workout_type,
        workout_date:new Date(params.workout.workout_date).toDateString,
        user_id:params.workout.user_id,
      });
      const handleInputChange = (event) => {
            console.log(event.target.value);
            const { name, value } = event.target;
            setWorkout((prevProps) => ({
              ...prevProps,
              [name]: value
            }));
      };
    const closeModel = () =>{
        params.setOpen(false)
    }
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(workout);
        workout.user_id=params.token
        axios.put(url, workout, {
          headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      }).then((res)=>{
            params.planDetail()
            closeModel()
             navigate('/myplan/'+params.workout.id, {replace: true})
        }).catch((error) =>{
            console.log(error);
        })

         
      };
    return<>
        <div className='formhead'><p className='formTitle'>Edit the Plan  </p><Button onClick={closeModel}>Close</Button></div>
        <p></p>
        <form  onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type="text" name="title"  placeholder='Workout Title' value={workout.title} onChange={handleInputChange} required/>
                <br></br><label>Description: </label>
                <input type="text" name="workout_desc" placeholder='Workout Description'  value={workout.workout_desc} onChange={handleInputChange} required />
                <br /><label>Workout Type : </label>
                <select id="workout_type" name="workout_type" value={workout.workout_type}  onChange={handleInputChange} required>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                <br></br><label>
                    Workout Date: 
                </label><input type="datetime-local" id="birthday"  name="workout_date" value={workout.workout_date} onChange={handleInputChange} required/>
            <br /><input type="submit" value="Submit" />
             <Button onClick={closeModel}>Cancel</Button>
        </form>
    </>
}

export default EditWorkoutForm;
import axios from 'axios';
import './AddWorkoutForm.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';
function AddWorkoutForm(params) {
    
    const navigate = useNavigate()
    const [workout, setWorkout] = useState({
        title: "",
        workout_desc: "",
        workout_type:"Public",
        workout_date:"",
        user_id:"",
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
        workout.user_id=localStorage.getItem('userId')
        axios.post('http://127.0.0.1:3000/workout/add', workout).then((res)=>{
            console.log(res.data);
            navigate('/myplan', {replace: true})
            closeModel()
        }).catch((error) =>{
            console.log(error);
        })
        setWorkout({
            title: "",
            workout_desc: "",
            workout_type:"Public",
            workout_date:"",
            user_id:"",
          })
         
      };
    return<>
        <div className='formhead'><p className='formTitle'>Add a Plan  </p><Button onClick={closeModel}>Close</Button></div>
        <div >
        <form  onSubmit={handleSubmit} >
                <input type="text" name="title"  placeholder='Workout Title' value={workout.email} onChange={handleInputChange} required  />
                <input type="text" name="workout_desc" placeholder='Workout Description'  value={workout.workout_desc} onChange={handleInputChange}  required />
                <br /><label>Workout Type : </label>
                <select id="workout_type" name="workout_type" value={workout.workout_type}  onChange={handleInputChange} required>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                <br></br><label>
                    Workout Date: 
                </label><input type="datetime-local" id="birthday" selected={workout.workout_date} name="workout_date"  value={workout.workout_date} onChange={handleInputChange} required/>
            <br /><input type="submit" value="Submit" />
             <Button onClick={closeModel}>Cancel</Button>
        </form>
        </div>
    </>
    
}

export default AddWorkoutForm;
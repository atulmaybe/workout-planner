import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
function RegisterUser(params) {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name:'',
        email:'',
        role:'trainer',
        password:'',
        password_confirmation: '',
    })

    const onInputChange = (event) =>{
        console.log(event.target.value);
        const { name, value } = event.target;
            setUser((prevProps) => ({
              ...prevProps,
              [name]: value
            }));
    }
    const onRegister = (event) =>{
        event.preventDefault()
        console.log(user);
        axios.post('http://localhost:3000/signup',user).then((res)=>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('role',res.data.role)
            localStorage.setItem('userEmail',res.data.userEmail)
            localStorage.setItem('userId',res.data.userId)
            localStorage.setItem('role',res.data.userName)
            navigate('/')
        }).catch((error) =>{
            console.log(error);
        })
    }
    return<div className="loginPage">
        <div className="formLogin">
        <h3>Regiter here</h3>
        <form onSubmit={onRegister}>
            <input type="text" name="name" value={user.name} placeholder="Name" onChange={onInputChange}/>
            <input type="email" name="email" value={user.email} placeholder="Email"  onChange={onInputChange} />
            <div className="selectinput">
                <label for="cars">Choose a car:</label>
                <select id="role" name="role" value={user.role}  onChange={onInputChange}>
                    <option value="trainer">Trainer</option>
                    <option value="user">User</option>
                </select>
            </div>
            <input type="password" name="password" placeholder="Password"  onChange={onInputChange}/>
            <input type="password" name="password_confirmation" placeholder="Confirm Password"  onChange={onInputChange}/>
            <input type="submit" name="submit" className="submitbtn" />
        </form>
        <Link to='/login'  className="signupbtn">Login</Link>
        </div>
    </div>
}

export default RegisterUser;
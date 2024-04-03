import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
function Login(params) {
    const navigate = useNavigate()
     const [user, setUser] = useState({
        email:'',
        password:''
     })
     const [error, setError ]= useState(null)
    const onInputChange = (event) =>{
        const { name, value } = event.target;
            setUser((prevProps) => ({
              ...prevProps,
              [name]: value
            }));
    }
    const onLogin = (event) =>{
        event.preventDefault()
        axios.post('http://localhost:3000/login',user).then((res)=>{
            if(res.data ==='Inccorect passowrd or email'){
                setError(res.data)
                navigate('/login')
            }else{
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('role',res.data.role)
                localStorage.setItem('userEmail',res.data.userEmail)
                localStorage.setItem('userId',res.data.userId)
                localStorage.setItem('userName',res.data.userName)
                navigate('/')
            }
        }).catch((error) =>{
            console.log(error);
        })
    }
    return <div className="loginPage">
        <div className="formLogin">
            <p className="error">{error}</p>
        <h3>Login</h3>
        <form onSubmit={onLogin}>
                <input type="email" name="email" value={user.email} placeholder="Email"  onChange={onInputChange} /> <br />
                <input type="password" name="password" placeholder="Password"  onChange={onInputChange}/> <br />
                <input type="submit" name="submit" className="submitbtn" />
        </form>
            <Link to='/register' className="signupbtn">Signup</Link>
        </div>
    </div>
}

export default Login;
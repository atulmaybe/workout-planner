import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile(params) {
    const [userInfo, setUserInfo] = useState(null)
    const userUrl = 'http://localhost:3000/userInfo/'+localStorage.getItem('userId');
    useEffect(()=>{
        getUserInfo()
    })
    const getUserInfo = async () =>{
        const response = await axios.get(userUrl)
        setUserInfo(response.data)
    }
    return  userInfo ?  <>
        <>
            <h3>Name: {userInfo.name}</h3>
            <h3>Email: {userInfo.email}</h3>
            <h3>User Role: {userInfo.role}</h3>
        </>
   </> : <p>Loading</p>
}

export default UserProfile;

import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { Box, Modal} from "@mui/material";
import { useState } from "react";
import AddWorkoutForm from "../workout/AddWorkoutForm";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor:'white',
    border: '2px solid white',
    boxShadow: 30,
    p: 2,
    borderRadius:'10px'
  };

function Nav(params) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const logout = () =>{
        localStorage.clear();
        navigate('/login')
    }
    return (
      <>
        {localStorage.getItem('token') !=null? <div>
        <ul>
            <li><p className="logo"> Workout Planner </p> </li>
            <li><Link to="/">All Plans</Link></li>
            <li><Link to="/myplan">My Plans</Link></li>
            <li><Link to="/assignedplans">Assigned Plans</Link></li>
            <li>
                <div>
                    <button onClick={handleOpen} className="btn">Add New Plan</button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <AddWorkoutForm setOpen = {setOpen} />
                        </Box>
                    </Modal>
                </div>
            </li>
            <li className="active"><button onClick={logout}><span>Logout</span></button></li>
            <li className="active"><Link to="/profile">My Profile</Link></li>
            <li className="active"><p>{localStorage.getItem('userName')}</p></li>
        </ul>
    </div> :
     <ul className="beforelogin">
         <li><p className="logo"> Workout Planner </p> </li>
     </ul>
     }
      </>
    )
}

export default Nav;

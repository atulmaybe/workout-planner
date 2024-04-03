
import './App.css';
import {Route, Routes} from "react-router-dom";
import MyPlan from './pages/MyPlan';
import PlanDetail from './pages/PlanDetail';
import RegisterUser from './components/authentication/RegisterUser';
import Home from './pages/Home';
import Login from './components/authentication/Login';
import Nav from './components/navabar/Nav';
import UserProfile from './components/profile/UserProfile';
import AssignedPlan from './pages/AssignedPlan';


function App(props) {
  return <div>
     <Nav/>
      <Routes>
        <Route path='/register' element={<RegisterUser /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/' element={<Home/> } />
        <Route path='/myplan' element={<MyPlan /> } />
        <Route path='/:workoutId' element={<PlanDetail />} />
        <Route path='/myplan/:workoutId' element={<PlanDetail />} />
        <Route path='/assignedplans/:workoutId' element={<PlanDetail />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/assignedplans' element={<AssignedPlan />} />
      </Routes>
  </div>
 }

export default App;

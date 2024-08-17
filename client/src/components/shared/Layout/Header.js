import React from 'react'
import { BiDonateBlood , BiUserCircle } from "react-icons/bi";
import { useSelector  } from 'react-redux';
import {useNavigate} from 'react-router-dom'
const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    //Logout HAndler
    const logoutHandler = () => {
        localStorage.clear();
        alert('Logout Successfully')
        navigate('/login')
    }
  return (
    <div>
    <nav className='navbar'>
        <div className='container-fluid'>
            <div className='navbar-brand'>
              <BiDonateBlood color='red'/>  Blood Bank App
            </div>

            <ul className='navbar-nav flex-row'>
               <li className='nav-item mx-3'>
                <p className='nav-link'>
                <BiUserCircle/> Welcome {user?.name} &nbsp; 
                <span className='badge bg-secondary'>{user?.role || user?.orginisationName || user?.hospitalName}</span>
                </p>
               </li>

               <li className='nav-item mx-3'>
                <button className='btn btn-danger' onClick={logoutHandler}>
               Logout
                </button>
               </li>
            </ul>
        </div>
    </nav>
    </div>
  )
}

export default Header

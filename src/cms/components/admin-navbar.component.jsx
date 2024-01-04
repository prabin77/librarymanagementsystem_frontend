import { NavLink, useNavigate } from "react-router-dom";
import authSvc from "../../pages/auth/auth.service";
import "../components/styles.css"

import { FaHome } from "react-icons/fa";

const AdminNavbar= ()=>{
    const navigate = useNavigate()
    
const handleLogout=async (e)=>{
   try{ e.preventDefault();
    let response = await authSvc.logoutUser()

    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")

    navigate("/login")
}catch(exception){
    console.log(exception)
}
}
    return(
        <>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           <FaHome/> Home
           <NavLink className="navbar-brand ps-3" to="/admin">
            <FaHome/> Admin Panel
            </NavLink>
           
           
           <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              
           </div>
           
           <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
               <li className="nav-item dropdown">
                   <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                   <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                       <li><a className="dropdown-item" href="#!">Profile update</a></li>
                       <li><hr className="dropdown-divider" /></li>
                       <li><a className="dropdown-item" onClick={handleLogout} href="/login">Logout</a></li>
                   </ul>
               </li>
           </ul>
       </nav>
        </>
    )
}

export default AdminNavbar;
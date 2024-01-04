import { NavLink } from "react-router-dom";
import "../components/styles.css"
import { useSelector } from "react-redux";

const AdminSidebar = () => {
    // let loggedInUser= JSON.parse(localStorage.getItem("user"))
    let loggedInUser= useSelector((rootStore)=>{
        return rootStore.User?.loggedInUser
    })
   
    return (
        <>
        
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="index.html">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </NavLink>
                            <div className="sb-sidenav-menu-heading">Features</div>
                            <NavLink className="nav-link" to="/admin/banner">
                                <div className="sb-nav-link-icon"><i className="fas fa-images"></i></div>
                                Banner Manager
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <NavLink className="nav-link " to="/admin/book" >
                                <div className="sb-nav-link-icon"><i className="fas fa-b"></i></div>
                                Book Manager
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <NavLink className="nav-link collapsed" to="/admin/genre" >
                                <div className="sb-nav-link-icon"><i className="fas fa-sitemap"></i></div>
                                Genre Manager
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <NavLink className="nav-link collapsed" to="/admin/author" >
                                <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                                Author Manager
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <NavLink className="nav-link collapsed" to="/admin/user" >
                                <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                User Manager
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            {/* <NavLink className="nav-link collapsed" to="/admin/order" >
                                <div className="sb-nav-link-icon"><i className="fas fa-shopping-cart"></i></div>
                                Borrow Detail
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink> */}
                            
                        </div>
                    </div>
                   { loggedInUser? <>
                    <div className="sb-sidenav-footer">
                      
                        <div className="small">Logged in as:</div>
                        {loggedInUser.name}
                        
                    </div></>:<></>}
                    
                </nav>
            </div>
        </>
    )
}
export default AdminSidebar;
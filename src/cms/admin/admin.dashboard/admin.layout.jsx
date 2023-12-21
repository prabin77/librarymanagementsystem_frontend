 import { Outlet } from "react-router-dom";
import AdminFooter from "../../components/admin-footer.components";
 import AdminNavbar from "../../components/admin-navbar.component";
 import AdminSidebar from "../../components/admin-sidebar.components";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../pages/reducers/user.reducer";
import { useEffect } from "react";


const AdminLayout = () => {
    
    const dispatch= useDispatch()
    useEffect(()=>{
        let token = localStorage.getItem('token' ) ?? null;
        if(token){
            dispatch(getLoggedInUser())
        }
    },[])
    return( <>
     
     <AdminNavbar/>
        <div id="layoutSidenav">
        
                <AdminSidebar/>
            
            <div id="layoutSidenav_content">
                <main>
                 <Outlet/>
                </main>
                <AdminFooter/>
            </div>
        </div>
    </>)
}

export default AdminLayout;
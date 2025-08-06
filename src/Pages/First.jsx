import Header from "../Components/Header"
import Footer from "../Components/Footer"
import Sidebar from "../Components/Sidebar"
import { Outlet,useLocation } from "react-router-dom"


function First() {
      const location = useLocation();
      const pathName = location.pathname;
  return (
    <>
    {pathName.length && pathName === '/login' ? <div className="login-bg"><div className="login-section"><Outlet/></div></div> :
    <div id="wrapper">
    {pathName.length && pathName !== '/login' && pathName !== '/createaccount' ? <Header/> : ""}
    {pathName.length && pathName !== '/login' && pathName !== '/createaccount' ? <Sidebar/> : ""}
    <div id="page-wrapper" className="dashbard-1">
    {pathName.length && pathName !== '/login' && pathName !== '/createaccount' ?  
    <div class="row border-bottom">
  <nav class="navbar super-admin navbar-static-top" role="navigation">
	<div class="col-lg-12 paddL0 paddR0"> 
    	<div class="col-lg-12 paddR0 right-align">  <span>Welcome back, Developer Testing Name!</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://localhost/coxy/totalspray/admin/users/logout/"> Logout <span class="logout-icon-top"></span></a></div>
    </div>
  </nav>
</div>: ""}
    <div className="page-content"><Outlet/></div>
    {pathName.length && pathName !== '/login' && pathName !== '/createaccount' ? <Footer/> : ""}</div>
    </div>
}
    </>
  )
}

export default First
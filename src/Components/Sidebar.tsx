import Logo from "../assets/images/logo.svg";
import { useNavigate } from 'react-router-dom';
function Sidebar() {

   const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // clear session data
    sessionStorage.removeItem("userData");
    // optionally: clear other related state / tokens here

    // redirect to login, replace so user can't go back
    navigate("/login", { replace: true });
  };

  return (
  <>
    <nav className="navbar-default navbar-static-side" id="side-menu-nav" role="navigation">
   <div className="sidebar-collapse">
      <div className="sidebar-top">
         <img src={Logo} />
      </div>
      <div className="menu-collaps-icon-div">
         <span className="menu-collaps-icon"></span>
      </div>
      <ul className="nav metismenu" id="side-menu">
         <li className="divider"></li>
                    <li className="active">
            <a href="/">
               <span className="dashboard-icon menu-icon"></span>
               <span className="menu-item">Dashboard</span>
            </a>
         </li>
         <li className="">
            <a href="/service">
               <span className="construction-icon menu-icon"></span>
               <span className="menu-item">Service</span>
            </a>
         </li>
                  <li className="">
            <a href="/support_tickets">
               <span className="support_tickets-icon menu-icon"></span>
               <span className="menu-item">Support Tickets</span>
            </a>
         </li>
         <li className="">
            <a href="/clients">
               <span className="user-icon menu-icon"></span>
               <span className="menu-item">Sites</span>
            </a>
         </li>
         <li className="">
            <a href="/asset_listing">
               <span className="resources-icon menu-icon"></span>
               <span className="menu-item">Assets </span>
            </a>
         </li>
         <li className="">
            <a href="/contact_listing">
               <span className="phone menu-icon"></span>
               <span className="menu-item">Contacts </span>
            </a>
         </li>
         <li className="divider"></li>
           <div className="page-heading-border"></div>
         <li className="">
            <a href="/archive">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               <span className="menu-item">Company</span>
            </a>
         </li>
                   <li className="divider"></li>
         <li className="">
            <a href="/global_settings">
               <span className="user-icon menu-icon"></span>
               <span className="menu-item">Users</span>
            </a>
         </li>
         <li className="">
            <a href="/users">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#323E42" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users "><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
               <span className="menu-item">User Groups</span>
            </a>
         </li>
                  <li>
               <a href="" onClick={handleLogout}>
               <span className="logout-icon menu-icon"></span>
               <span className="menu-item">Logout</span>
            </a>
         </li>
      </ul>
   </div>
</nav>
    </>
  )
}

export default Sidebar
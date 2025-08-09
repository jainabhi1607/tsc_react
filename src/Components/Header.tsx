import Logo from "../assets/images/logo.svg";
 var userData = JSON.parse(sessionStorage.getItem("userData"));
const Header = () => {
  
  return (
    <>

    <div className="top-search-box">
	
  	<img src="<?php echo Router::url('/', true)?>img/logo.svg" />

    
    {userData?.role < 4 && (
                          <>
                            <div className="top-search-input">
                              <span className="search-icon"></span>
                              <input type="text" name="keyword" className="search" id="search_keyword"   /></div>
<input type="hidden" name="search_filter_value" id="search_filter_value" value="1" />
                          </>
                        )}

                        <label className="float-right">
                          <span>Welcome back, {userData.name} {userData.last_name}!
           </span><a href="<?php echo Router::url('/', true)?>admin/users/logout/" className="float-right">&nbsp;&nbsp;&nbsp;&nbsp; Logout <span className="logout-icon-top"></span></a>
           {userData?.role < 4 && (
                          <>
          <a href="<?php echo Router::url('/', true)?>admin/users/my_profile" className="top_user_circle"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
          </>
          )}
          </label>
          
                        </div>
<div id="search_results">
	
</div>
        
    </>
  );
};

export default Header;

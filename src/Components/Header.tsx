import Logo from "../assets/images/logo.svg";

const Header = () => {
  return (
    <>
        <div className="top-search-box">
	
  	<img src={Logo} alt="" className="w-full h-full" />
		<div className="top-search-input"><span className="search-icon"></span>
        <input type="text" name="keyword" className="search" id="search_keyword"/></div>
        <input type="hidden" name="search_filter_value" id="search_filter_value" value="1"/>
		 <label className="float-right"><span>Welcome back, Clark Kelly!</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"> Logout <span className="logout-icon-top"></span></a></label>
</div>
    <div id="search_results">
	
</div>
    </>
  );
};

export default Header;

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function First() {
  const location = useLocation();
  const pathName = location.pathname;

  if (pathName !== "/login" && !sessionStorage?.getItem("userData")) {
    // navigate("/login", { replace: true });
    window.location.href = "/login";
  }

  return (
    <>
      {pathName.length && pathName === "/login" ? (
        <div className="login-bg">
          <div className="login-section">
            <Outlet />
          </div>
        </div>
      ) : (
        <div id="wrapper">
          {pathName.length &&
          pathName !== "/login" &&
          pathName !== "/createaccount" ? (
            <Header />
          ) : (
            ""
          )}
          {pathName.length &&
          pathName !== "/login" &&
          pathName !== "/createaccount" ? (
            <Sidebar />
          ) : (
            ""
          )}
          <div id="page-wrapper" className="dashbard-1">
            {pathName.length &&
            pathName !== "/login" &&
            pathName !== "/createaccount" ? (''
            ) : (
              ""
            )}
            <div className="page-content">
              <Outlet />
            </div>
            {pathName.length &&
            pathName !== "/login" &&
            pathName !== "/createaccount" ? (
              <Footer />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default First;

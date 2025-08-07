import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userid, setUserid] = useState(0);
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function checkLogin(e) {
    /*const result = fetch("https://tsc.sterlinginfotech.com/users/loginReact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // ← this is required for cookies
  body: JSON.stringify({ username, password }),
})
.then(res => res.json());*/

    try {
      e.preventDefault();
      const response = await axios.post(
        "https://tsc.sterlinginfotech.com/users/loginReact",
        {
          username,
          password,
        },
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (response.data.login_response === "Error") {
          setMessage({
            type: "failure",
            errorString: "Invalid Username / Password",
          });
        } else {
          sessionStorage.setItem(
            "userData",
            JSON.stringify(response.data.data)
          );
          //console.log(sessionStorage.getItem("userData"))
          // checkUserStatus();
          navigate("/");
        }
      }
    } catch (error) {
      setMessage({
        type: "failure",
        errorString: "Invalid Username / Password",
      });
    }
  }

  return (
    <>
      <form method="post" onSubmit={checkLogin}>
        <div className="login-bg">
          <div className="col-lg-6 col-sm-12">
            <div className="middle-box loginscreen">
              <div className="col-lg-12 col-sm-12 login-div">
                <div className="logo">
                  <img src={Logo} alt="Total Spray" />
                </div>
                <p className="white clear paddB5 marB0">Login</p>
              </div>
              <div className="clear paddB20"></div>
              {message.errorString ? (
                <div className="error">{message.errorString}</div>
              ) : (
                ""
              )}
              <div className="col-lg-12 col-sm-12 login-div">
                <div id="login-inner">
                  <div className="form-group">
                    <div>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onInput={(e) => setUsername(e.target.value)}
                        id="username"
                      ></input>{" "}
                    </div>
                  </div>
                  <div className="form-group marB0">
                    <div>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onInput={(e) => setPassword(e.target.value)}
                        id="password"
                      ></input>{" "}
                    </div>
                  </div>
                  <div className="clear paddB20"></div>
                  <div></div>
                  <div className="submit">
                    <input
                      type="submit"
                      className="btn green-btn"
                      id="submit_btn"
                      value="Login"
                    />
                  </div>
                </div>
                <div className="clear paddB30"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 login-background"></div>
        </div>
      </form>
    </>
  );
}

export default Login;

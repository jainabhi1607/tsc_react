import React, { useEffect, useState } from 'react'
import Logo from "../assets/images/logo.svg";
import axios from 'axios';


function Login() {
  return (<>
        <div class="login-bg"> 
<div class="col-lg-6 col-sm-12">
  <div class="middle-box loginscreen">
    <div class="col-lg-12 col-sm-12 login-div">
      <div class="logo"><img src={Logo} alt="Total Spray" /></div>
        <p class="white clear paddB5 marB0">Create Account</p>
    </div>
      <div class="clear paddB20"></div>
    <div class="col-lg-12 col-sm-12 login-div">
      <div id="login-inner"> 
        <div class="form-group">
          <div><input type="text" name="username" class="form-control" placeholder="Username"></input> </div>
        </div>
        <div class="form-group marB0">
          <div><input type="password" name="password" class="form-control" placeholder="Password"></input> </div>
        </div>
        <div class="clear paddB20"></div>
        <div></div>
        <div class="submit"><input type="submit" class="btn green-btn" id="submit_btn" value="Login"/></div>
        </div>
        <div class="clear paddB30"></div>
    </div>
    </div>
  </div>
  <div class="col-lg-6 col-sm-12 login-background"> 
    </div>
</div>
    </>
  )
}

export default Login
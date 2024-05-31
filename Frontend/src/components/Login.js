import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [privacyimg, setPrivacyImg] = useState('https://i.ibb.co/r2nvB7s/hideicon.png')

  const Navigate = useNavigate();

    useEffect(() => { // Check for existing user data in localStorage on mount
      const loggedInUser = localStorage.getItem("users");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser); // Parse stored data back to object
        setUser(foundUser);
        
      }
    }, []);
  async function handleSubmit(e){
    e.preventDefault();
    const user = {Email : email, Password : password};
    try{

      const response = await axios.post("http://localhost:3001/signin",user)

      if(response.data.success){
        toast.success("Logged in")
        setUser(response.data.user);
        // console.log(response.data.user)
        localStorage.setItem('users', JSON.stringify(response.data.user));

        // console.log(user)
      //  setTimeout(() => {
      //    Navigate("/qrtype");
      //   }, 2000);
      }
      else{
        toast.error(response.data.message)
      }
      
    }
    catch(err){
      console.log(err)
    }
  }

  const handleHideShow = () => {
    var pw = document.getElementById("password");
    if (pw.type === "password") {
      pw.type = "text";
      setPrivacyImg("https://i.ibb.co/CMNmH6f/showicon.png");
    }
    else {
      pw.type = "password";
      setPrivacyImg("https://i.ibb.co/r2nvB7s/hideicon.png");
    }
  }



  if(user){
    Navigate("/")
  }

  return (
    <>
      <div className="flex flex-wrap mt-20 justify-center align-center">
    <ToastContainer/>

        <div className="w-full max-w-xl">
  <form onSubmit={handleSubmit} method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline lowercase" id="email" type="email" placeholder="Enter your Email" value={email} onChange={(e) => {setEmail(e.target.value)}}  required name="email"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <div className="flex">

      <input className="lowercase shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " id="password" type="password" placeholder="Enter your Password" value={password} onChange={(e) => {setPassword(e.target.value);}}  required name='password'/>
      <div >
                  <img src={privacyimg} id='showicon' onClick={handleHideShow} />

                </div>
      </div>

      {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Login
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-purple-700 hover:text-purple-500" href="#">
        Forgot Password?
      </a>
    </div>
  <hr className="mt-8" />
            <div className="flex justify-center mb-3 mt-3 ">
              <p>Don't have an account?</p>
            </div>
            <div className="justify-center flex">
              <Link to="/signup" className="bg-gray-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded " id="sign_up_button">
                Sign Up
              </Link>
            </div>
  </form>

</div>
      </div>
    </>
  )
}

export default Login
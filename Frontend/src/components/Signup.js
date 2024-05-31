import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import './Signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useCountries } from "use-react-countries";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

function Signup() {
    const [privacyimg, setPrivacyImg] = useState('https://i.ibb.co/r2nvB7s/hideicon.png')
  const { countries } = useCountries();
  const [country, setCountry] = useState(0);
  const { name, flags, countryCallingCode } = countries[country];
  const sortedCountries =  countries.sort((a,b)=>{
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
})
//   const sd = sortedCountries.sort()
  const Navigate = useNavigate();
  
//   console.log(sortedCountries)

  const handleHideShow = () => {
    var pw = document.getElementById("exampleInputPassword");
    if (pw.type === "password") {
      pw.type = "text";
      setPrivacyImg("https://i.ibb.co/CMNmH6f/showicon.png");
    }
    else {
      pw.type = "password";
      setPrivacyImg("https://i.ibb.co/r2nvB7s/hideicon.png");
    }
  }


    const initialValues = {firstname : "", lastname : "", email : "", password : "", phonenumber : ""};

    const[formData, setFormData] = useState(initialValues);
    const[formErrors, setFormErrors] = useState({});
    const handleChange =(e) =>{
        const {name, value} = e.target;

        setFormData({...formData, [name] : value})
    }

const handleSubmit = async(e)=>{
      e.preventDefault();
      setFormErrors(validate(formData));
    
      try{
        const response = await axios.post('http://localhost:3001/register',{ 
         firstName : formData.firstname,
           lastName : formData.lastname,
           email : formData.email,
           password : formData.password,
           phoneNumber : formData.phonenumber
         })
         console.log(response.data);
         if(response.data.success){
           toast.success(response.data.message);
           setFormData(initialValues);
            // Navigate("/")
          }
          else{
           toast.error(response.data.message)
          }
          
         
      }
      catch(err){
        console.log(err)
      }
      

    }

    const validate = (values)=>{
      const errors = {};

        const emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const passwordRegex = /(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}/;
        const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

        if(!values.firstname){
          errors.firstname = "Firstname is required."
        }
        if(!values.email){
          errors.email = "Email is required."
        }
        else if(!emailregex.test(values.email)){
          errors.email = "This is not valid Email address."
        }
        if(!values.password){
          errors.password = "Password is required."
        }
        else if(!passwordRegex.test(values.password)){
          errors.password = "Password must have at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
        }
        
        if(!values.phonenumber){
          errors.phonenumber = "Phone Number is required."
        }
        else if(!phoneNumberRegex.test(values.phonenumber)){
          errors.phonenumber = "Please Provide Valid Number"
        }
        return errors;

    }
  return (
    <div className="flex flex-wrap mt-20 justify-center align-center ">
    <div className="w-full max-w-xl">
  <form onSubmit={handleSubmit} method='POST' className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <div className='flex'>

              <div className="mb-3">
                <label htmlFor="InputFirstName" className='block text-gray-700 text-sm font-bold mb-2'>
                  <strong>FirstName <span style={{color:'red', fontSize : "1em"}}>*</span></strong>
                </label>

                <input type="text" value={formData.firstname} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="John" name='firstname'
                   />
                  <p className="form_errors" style={{color:'red', fontSize : "1em"}}>{formErrors.firstname}</p>
              </div>

              <div className="mb-3 mx-auto px-2">
                <label htmlFor="InputFirstName" className='block text-gray-700 text-sm font-bold mb-2'>
                  <strong>LastName</strong>
                </label>

                <input type="text" value={formData.lastname} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Wick" name='lastname'
                   />
                   
              </div>
    </div>
      


              <div className="mb-4">
                <label htmlFor="exampleInputEmail1" className="block text-gray-700 text-sm font-bold mb-2">
                  <strong>Email <span style={{color:'red', fontSize : "1em"}}>*</span></strong>
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="name@gmail.com"
                  name="email"
                  
                />
                  <p className="form_errors" style={{color:'red', fontSize : "1em"}}>{formErrors.email}</p>

              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  <strong>Password <span style={{color:'red', fontSize : "1em"}}>*</span></strong>
                </label>
                <div className='flex'>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="exampleInputPassword"
                  placeholder="At least 8 characters"
                  name='password'
                  
                />
                <div >
                  <img src={privacyimg} id='showicon' onClick={handleHideShow} />

                </div>
                </div>
                <p className="form_errors" style={{color:'red', fontSize : "1em"}}>{formErrors.password}</p>
                
              </div>

              <div className='mb-2'>
                <label htmlFor="InputPhoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                <strong>Phone Number <span style={{color:'red', fontSize : "1em"}}>*</span></strong>
                </label>

                {/* <div className="relative w-full">
                    <input type="phone" id="phone-input" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required/>
                </div> */}
    <div className="relative flex w-full">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex h-11 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 w-28"
          >
            <img
              src={flags.svg}
              alt={name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {countryCallingCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-80 max-w-7xl overflow-y-scroll">
          {countries.map(({ name, flags, countryCallingCode }, index) => {
            return (
              <MenuItem
                key={name}
                value={name}
                className="flex items-center gap-2 py-4"
                onClick={() => setCountry(index)}
              >
                <img
                  src={flags.svg}
                  alt={name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                {name} <span className="ml-auto">{countryCallingCode}</span>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Input
        type="number"
        placeholder="Mobile Number"
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        name='phonenumber'
        value={formData.phonenumber}
        onChange={handleChange}
      />
    </div>
                </div>
            
              <p className="form_errors " style={{color:'red', fontSize : "1em"}}>{formErrors.phonenumber}</p>

              

              {/* <Link to="/" className="justify-content-end d-flex">
                Forget password?
              </Link> */}
              <br />
              <div className="flex  justify-center ">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  id="login_button"
                  // onClick={handleSubmit}
                >
                  Sign Up
                </button>
        <ToastContainer position="top-right"/>

              </div>

             
              <br />
            <hr />
            <div className="flex justify-center">
              <Link to="/login" className='text-blue-500 hover:blue-300'><strong>Already have an account?</strong></Link>
            </div>
    </form>
    </div>
    </div>
  )
}

export default Signup
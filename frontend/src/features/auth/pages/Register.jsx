import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader'
import { GrLinkNext } from "react-icons/gr";
import { FaArrowLeft, FaUser, FaMapMarkerAlt, FaPhone, FaGraduationCap, FaFileAlt } from "react-icons/fa";

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [cPassword, setcPassword] = useState('')
  const [error, setError] = useState('')
  const [changePanle, setChangePanle] = useState(false)

  // Additional fields for second panel
  const [phoneNumber, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  const [education, setEducation] = useState('')

  const {loading,handleRegistre} = useAuth();
  const navigation = useNavigate();


  const [emailError, setEmailError] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isValidEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handelSubmit = async (e)=>{

    e.preventDefault();
    if(password !== cPassword){
        return;
    }

    try{
      const res = await handleRegistre({name,email,password, phoneNumber, location, bio, education})
      if(res){
        setName("");
        setEmail("");
        setPassword("");
        setcPassword("");
        setPhone("");
        setLocation("");
        setBio("");
        setEducation("");
        navigation("/home")
      }

    }catch(err)
    {
      setError(err?.message);
    }
  }

  if(loading)
  {
     return (<Loader />)
  }


  return (
    <main className="h-screen bg-gray-100 flex items-center justify-center">
      
      <form onSubmit={handelSubmit} className="bg-white relative lg:w-1/3 sm:w-1/2 md:w-3/8 p-8 rounded-xl shadow-md">

        {/* half Register form  */}
        <div>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Register
          </h1>

          {error && (
            <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              required
              onChange={(e)=>{setName(e.target.value)}}
              placeholder="Enter your full name"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="mb-1 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {emailError && (
              <span className="text-red-500 text-sm mt-1">{emailError}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="mb-1 text-sm font-medium">
              Password
            </label>
            <input
              // type="password"
              id="password"
              required
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Create a password"
              className={`
                border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col mb-6">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              value={cPassword}
              onChange={(e)=>{setcPassword(e.target.value)}}
              placeholder="Confirm your password"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <span
            className={`text-sm mt-1 ${
              password !== cPassword && cPassword !== ""
                ? "text-red-500 animate-pulse"
                : "hidden"
            }`}
          >
            Passwords do not match
          </span>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={()=>{setChangePanle(true)}}
            disabled={password !== cPassword || !password || !name || !email}
            className={`w-full flex items-center gap-2 justify-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition active:scale-95 ${
              password !== cPassword || !password || !name || !email ? "opacity-50 cursor-not-allowed active:scale-100" : ""
            }`}
          >
            Next
            <GrLinkNext />
          </button>

          {/* Login Redirect */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to={'/login'} className="text-blue-600 cursor-pointer hover:underline">
              Login
            </Link>
          </p>

        </div>

        {/* full register from  */}
        { changePanle &&(
          <div className='absolute z-10 top-0 left-0 w-full bg-white rounded-xl p-8'>
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setChangePanle(false)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
            >
              <FaArrowLeft />
              Back
            </button>

            <h1 className="text-2xl font-semibold text-center mb-6">
              Complete Your Profile
            </h1>

            {error && (
              <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                {error}
              </div>
            )}

            {/* Phone Number */}
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-1 text-sm font-medium flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col mb-4">
              <label htmlFor="location" className="mb-1 text-sm font-medium flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your city, country"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col mb-4">
              <label htmlFor="bio" className="mb-1 text-sm font-medium flex items-center gap-2">
                <FaFileAlt className="text-gray-500" />
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows="3"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Education */}
            <div className="flex flex-col mb-6">
              <label htmlFor="education" className="mb-1 text-sm font-medium flex items-center gap-2">
                <FaGraduationCap className="text-gray-500" />
                Education
              </label>
              <input
                type="text"
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g., Bachelor's in Computer Science"
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              // onClick={handelSubmit}
              disabled={!phoneNumber || !location || !bio || !education}
              className={`w-full flex items-center gap-2 justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition active:scale-95 ${
                !phoneNumber || !location || !bio || !education ? "opacity-50 cursor-not-allowed active:scale-100" : ""
              }`}
            >
              <FaUser />
              Complete Registration
            </button>
          </div>
        )}

      </form>
    </main>
  )
}

export default Register
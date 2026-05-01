import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import Loader from './Loader';

const Login = () => {

  const {loading,handleLogin}  = useAuth();
  const navegation = useNavigate();


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const handelSubmit = async (e)=>{
      e.preventDefault();

      try{

        const res = await handleLogin({email,password})
        if(res)
        {          
          setEmail("");
          setPassword("");
          navegation("/home")
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
      
      <form onSubmit={handelSubmit} className="bg-white lg:w-3/12 sm:w-1/2 md:w-1/2 p-8 rounded-xl shadow-md">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        {/* Email */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="mb-1 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter your email address"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="password" className="mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Enter your password"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition active:scale-95"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          If you don't have account?{" "}
          <Link to={'/register'} className="text-blue-600 cursor-pointer hover:underline">
            Register
          </Link>
        </p>
        
      </form>
    </main>
  )
}

export default Login
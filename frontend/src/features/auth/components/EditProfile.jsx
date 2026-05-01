import React, { useContext, useState } from 'react'
import { AuthContex } from '../Auth.contex'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaHome, FaSave, FaTimes, FaPalette, FaLock, FaCamera } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { toast } from 'react-toastify'

const EditProfile = () => {

  const navigate = useNavigate();
  const {user} =useContext(AuthContex);
  const [name, setname] = useState(user?.name || "")
  const [email, setemail] = useState(user?.email || "")
  const [phoneNumber, setphoneNumber] = useState(user?.phoneNumber || "")
  const [location, setlocation] = useState(user?.location || "")
  const [bio, setbio] = useState(user?.bio || "")
  const [education, seteducation] = useState(user?.education || "")

  const {handelUpdateUSer,handleChangePassword} = useAuth();

    useEffect(() => {
    if (user) {
      setname(user.name || "");
      setemail(user.email || "");
      setphoneNumber(user.phoneNumber || "");
      setlocation(user.location || "");
      setbio(user.bio || "");
      seteducation(user.education || "");
    }
  }, [user]);

  const handleEdit = async () => {
    try {
      const updateData = {};

      if (name && name !== user.name) updateData.name = name;
      if (email && email !== user.email) updateData.email = email;
      if (phoneNumber && phoneNumber !== user.phoneNumber) updateData.phoneNumber = phoneNumber;
      if (location && location !== user.location) updateData.location = location;
      if (bio && bio !== user.bio) updateData.bio = bio;
      if (education && education !== user.education) updateData.education = education;

      const res = await handelUpdateUSer(updateData); // ✅ pass kar diya

      if (res) {
        navigate('/profile');
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };
  

  
  // const [user, setuser] = useState({
  //   name: user?.name || '',
  //   email: user?.email || '',
  //   phone: user?.phoneNumber || '+1 (555) 000-0000',
  //   location: user?.location || '',
  //   title: user?.title || 'Job Title',
  //   bio: user?.bio || '',
  //   education: user?.education || ''
  // });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.warning("new Password dose not match")
      return;
    }

    try {
      const res =await handleChangePassword(passwordData);

      if(res)
      {
        toast.success("Password updated successfully");
      }else
      {
        toast.warn("Current Password is incorect")
      }

      // reset fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
      {/* Navigation Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500">
                <GiStarsStack className="text-white text-lg" />
              </div>
              <h1 className="text-xl font-bold text-white">Edit Profile</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/home"
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <FaHome className="text-cyan-400" />
                <span className="text-sm font-medium">Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Profile Picture Section */}
        <div className="mb-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 p-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">
                  <FaUser className="text-white text-6xl" />
                </div>
                <button className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 border-2 border-white hover:bg-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/50">
                  <FaCamera className="text-white text-lg" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Upload New Photo</h2>
              <p className="text-slate-400 text-sm">Click the camera icon to change your profile picture</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaUser className="text-cyan-400" />
              Personal Information
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e)=>{setname(e.target.value)}}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>{setemail(e.target.value)}}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={phoneNumber}
                  onChange={(e)=>{setphoneNumber(e.target.value)}}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e)=>{setlocation(e.target.value)}}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="Enter your location"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-400 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e)=>{setbio(e.target.value)}}
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-400 mb-2">Education</label>
                <input
                  type="text"
                  name="education"
                  value={education}
                  onChange={(e)=>{seteducation(e.target.value)}}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="e.g., Bachelor's in Computer Science"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-8">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl shadow-black/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaLock className="text-red-400" />
                Password & Security
              </h2>
              <button
                onClick={() => setShowPasswordChange(!showPasswordChange)}
                className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl hover:bg-red-500/20 transition-all duration-300"
              >
                {showPasswordChange ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {showPasswordChange && (
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-400 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="md:col-span-3">
                  <button
                    onClick={handlePasswordSubmit}
                    className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all duration-300"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {!showPasswordChange && (
              <div className="p-4 rounded-2xl border border-white/10">
                <p className="text-slate-400 cursor-pointer">
                  Your password is the key to your account security. Change it regularly and never share it with anyone.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105 transition-all duration-300"
          >
            <FaSave className="text-lg" />
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-600/20 border border-slate-500/30 text-white font-bold rounded-2xl hover:bg-slate-600/40 transition-all duration-300"
          >
            <FaTimes className="text-lg" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
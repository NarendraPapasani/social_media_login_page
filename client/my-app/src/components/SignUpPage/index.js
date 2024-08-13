import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import ReactLoading from "react-loading";
const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={667} width={375} />
);
const SignUpPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [sex, setGender] = useState("");
  const [interests, setInterests] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const { setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const formData = {
    name,
    email,
    password,
    mobileNumber,
    sex,
    interests,
    profilePhoto,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        await doCreateUserWithEmailAndPassword(email, password);
        try {
          const resp = await axios.post("/signup", formData);
          console.log(resp.data);
          setIsLoading(false);
          setCurrentUser(resp.data.user);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  const handleInterestChange = (e) => {
    setInterests(e.target.value);
  };

  const handleProfilePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleCoverPhotoUpload = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md m-10">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-medium mb-2 text-left font-serif"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block font-medium mb-2 text-left font-serif"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2 font-mono text-left font-serif">
              Gender
            </label>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={sex === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                <label htmlFor="male" className="font-medium">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={sex === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                  required
                />
                <label htmlFor="female" className="font-medium">
                  Female
                </label>
              </div>
            </div>
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="interests"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Interested Areas
            </label>
            <select
              id="interests"
              value={interests}
              onChange={handleInterestChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="travel">Travel</option>
              <option value="technology">Technology</option>
              <option value="art">Art</option>
            </select>
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePhoto"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Profile Photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="profile-photo-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 font-semibold">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  id="profile-photo-upload"
                  name="profile-photo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePhotoUpload}
                />
              </label>
            </div>
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="coverPhoto"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Cover Photo
            </label>
            <input
              type="file"
              id="coverPhoto"
              accept="image/*"
              onChange={handleCoverPhotoUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            {isLoading ? (
              <ReactLoading
                type="balls"
                color="#ffffff"
                height={20}
                width={25}
                className="mx-auto"
              />
            ) : (
              <p>Sign Up</p>
            )}
          </button>
        </form>
        <p className="text-center text-gray-700 font-medium mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

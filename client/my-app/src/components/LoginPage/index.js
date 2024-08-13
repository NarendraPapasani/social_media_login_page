import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

const LoginPage = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      setLoading(false);
      setCurrentUser(email);
      navigate("/");
      setIsSigningIn(true);
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    doSignInWithGoogle().catch((err) => {
      setIsSigningIn(true);
      setLoading(false);
      setError(err.message);
    });
    if (isSigningIn) {
      navigate("/");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-medium mb-2 font-mono text-left font-serif"
            >
              Username
            </label>
            <input
              type="text"
              id="Email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
            <p className="text-red-500 text-sm"></p>
          </div>
          <div className="mb-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
            <p className="text-red-500 text-sm"></p>
            <Link to="/reset">
              <p className="text-right text-sm text-indigo-500 hover:text-indigo-700 font-mono font-semibold">
                Forgot Password?
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors mb-4 font-semibold"
          >
            {loading ? (
              <ReactLoading
                type="balls"
                color="#ffffff"
                height={20}
                width={25}
                className="mx-auto"
              />
            ) : (
              <p>Login</p>
            )}
          </button>
          <p className="text-red-500 text-sm">{error}</p>
        </form>
        <p className="text-center">or</p>
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={onGoogleSignIn}
            type="button"
            className="flex items-center justify-center bg-gray-100 border text-gray-700 py-2 px-4 rounded-2xl hover:bg-gray-100 transition-colors font-semibold"
          >
            <FcGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
        <p className="text-center text-gray-700 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

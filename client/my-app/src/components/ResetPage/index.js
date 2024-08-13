import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doPasswordReset,
} from "../../firebase/auth";
const ResetPage = () => {
  const [email, setEmail] = useState("");
  const [isPassReset, setIspassReset] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle reset password logic here
    setLoading(true);
    doPasswordReset(email)
      .then(() => {
        setLoading(false);
        setIspassReset("sent");
      })
      .catch((error) => {
        setError(error.message);
        setIspassReset("not");
        setLoading(false);
      });
  };
  let a,
    b = "Submit";
  if (isPassReset === "sent") {
    a = (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-5"
        role="alert"
      >
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> Email Sent Successfully.</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-18c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm4.707 6.293a1 1 0 0 0-1.414-1.414L10 10.586 6.707 7.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
          </svg>
        </span>
      </div>
    );
    b = "Login Now";
  } else if (isPassReset === "not") {
    a = (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-18c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm5.707 6.293a1 1 0 0 0-1.414-1.414L10 10.586 5.707 6.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l4-4z" />
          </svg>
        </span>
      </div>
    );
    b = "Submit";
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium mb-2 font-mono text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            {a}
          </div>
          <div className="flex justify-between">
            <Link
              to="/login"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-semibold"
            >
              Back
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors font-semibold"
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
                <p>{b}</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;

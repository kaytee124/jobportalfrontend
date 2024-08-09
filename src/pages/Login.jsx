import React, { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userType, setUserType] = useState('applicant');

  const { login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const validatePassword = (password) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must contain at least one number, one letter, one symbol, and be at least 8 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      await login(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: 'You will be redirected shortly.',
      });

      // Navigate based on userType
      if (userType === 'employer') {
        navigate('/employer-dashboard', { replace: true });
      } else if (userType === 'applicant') {
        navigate('/applicant-dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="h-screen mx-auto container flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
        >
          <h3 className="text-xl font-semibold mb-4">Please Login!</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="name@email.com"
            />
            {emailError && (
              <p className="text-red-500 text-xs italic">
                {emailError}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">
                {passwordError}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-xs italic">
                {errorMessage}
              </p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>User Type</label>
            <select
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value='applicant'>Applicant</option>
              <option value='employer'>Employer</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Sign in"
            />
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-800 font-bold">
                Register here
              </Link>
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Ashesi Career Service JobPortal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

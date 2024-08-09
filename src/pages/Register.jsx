import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';


const Register = () => {
  const [userType, setUserType] = useState('applicant');
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Gender, setGender] = useState('');
  const [Origin, setOrigin] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Password, setPassword] = useState('');
  const [VerifyPassword, setVerifyPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigateTo = useNavigate();

  const Userregister = (event) => {
    event.preventDefault();
    const errors = {};
  
    // Validation
    if (!/^[A-Za-z]{3,}$/.test(Firstname)) {
      errors.Firstname = "Firstname must contain only alphabets and have a length of 3 or more";
    }
    if (!/^[A-Za-z]{3,}$/.test(Lastname)) {
      errors.Lastname = "Lastname must contain only alphabets and have a length of 3 or more";
    }
    const currentDate = new Date();
    const selectedDate = new Date(DateOfBirth);
    const minDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
    if (selectedDate >= minDate) {
      errors.DateOfBirth = "Date of Birth must be more than 10 years old from the current year";
    }
    if (!Email.includes("@")) {
      errors.Email = "Invalid email address";
    }
    if (!/^\d{10}$/.test(PhoneNumber) || PhoneNumber[0] !== '0') {
      errors.PhoneNumber = "Phone Number must be 10 digits long and start with 0";
    }
    if (!/^[A-Za-z ]+$/.test(Origin)) {
      errors.Origin = "Country of Origin must contain only letters";
    }
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(Password)) {
      errors.Password = "Password must contain at least one number, one letter, one symbol, and be at least 8 characters long";
    }
    if (Password !== VerifyPassword) {
      errors.VerifyPassword = "Passwords do not match";
    }
    if (userType === 'employer' && !CompanyName.trim()) {
      errors.CompanyName = "Company Name is required for employers";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    Axios.post('http://13.60.171.7:8000/register', {
      userType,
      Firstname,
      Lastname,
      DateOfBirth,
      Gender,
      Email,
      PhoneNumber,
      Origin,
      CompanyName,
      Password,
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You can now log in.',
      }).then(() => {
        navigateTo('/login'); // Redirect to login page after successful registration
      });
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Registration error',
        text: 'An error occurred during registration. Please try again.',
      });
    });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Ensure full height and center */}
      <div className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
        <form
          onSubmit={Userregister}
        >
          <h3 className="text-xl font-semibold mb-4">Register</h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Type
            </label>
            <select
              value={userType}
              onChange={(event) => setUserType(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="applicant">Applicant</option>
              <option value="employer">Employer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter First Name"
              onChange={(event) => setFirstname(event.target.value)}
              required
            />
            {errors.Firstname && <p className="text-red-500 text-xs italic">{errors.Firstname}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Last Name"
              onChange={(event) => setLastname(event.target.value)}
              required
            />
            {errors.Lastname && <p className="text-red-500 text-xs italic">{errors.Lastname}</p>}
          </div>

          {userType === 'employer' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter Company Name"
                onChange={(event) => setCompanyName(event.target.value)}
                required
              />
              {errors.CompanyName && <p className="text-red-500 text-xs italic">{errors.CompanyName}</p>}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="name@email.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {errors.Email && <p className="text-red-500 text-xs italic">{errors.Email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              placeholder="Enter Phone Number"
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
            {errors.PhoneNumber && <p className="text-red-500 text-xs italic">{errors.PhoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              onChange={(event) => setDateOfBirth(event.target.value)}
              required
            />
            {errors.DateOfBirth && <p className="text-red-500 text-xs italic">{errors.DateOfBirth}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  onChange={(event) => setGender(event.target.value)}
                  required
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={(event) => setGender(event.target.value)}
                  required
                /> Female
              </label>
              <label>
                <input
                  type="radio"
                  value="other"
                  name="gender"
                  onChange={(event) => setGender(event.target.value)}
                  required
                /> Other
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country of Origin
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter Country of Origin"
              onChange={(event) => setOrigin(event.target.value)}
              required
            />
            {errors.Origin && <p className="text-red-500 text-xs italic">{errors.Origin}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {errors.Password && <p className="text-red-500 text-xs italic">{errors.Password}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Verify Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Re-enter Password"
              onChange={(event) => setVerifyPassword(event.target.value)}
              required
            />
            {errors.VerifyPassword && <p className="text-red-500 text-xs italic">{errors.VerifyPassword}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="text-blue-500 hover:text-blue-800"
              type="submit"
            >
              Register
            </button>
            <Link to="/login">
              <p className="text-blue-500 hover:text-blue-800">Already have an account? Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

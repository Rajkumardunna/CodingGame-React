import React, { useState } from 'react';
import axios from 'axios';
import './Login-Registration/App.css';

const App = () => {
  // Define state variables for all the form fields
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    otp: '',
    educationQualification: '',
    programmingLanguage: '',
    gender: '',
    location: '',
    password: '',
    confirmPassword: '',
  });

  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validation checks for login
    if (isLogin) {
      if (!formData.firstName || !formData.password) {
        validationErrors.general = 'All fields are required.';
      }
    } else {
      // Validate registration form fields
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.phoneNumber ||
        !formData.email ||
        !formData.educationQualification ||
        !formData.programmingLanguage ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        validationErrors.general = 'All fields are required.';
      }

      // Validate first name and last name (only alphabets and spaces allowed)
      const nameRegex = /^[A-Za-z\s]*$/;
      if (formData.firstName && !nameRegex.test(formData.firstName)) {
        validationErrors.firstName = 'First Name must contain only alphabets.';
      }
      if (formData.lastName && !nameRegex.test(formData.lastName)) {
        validationErrors.lastName = 'Last Name must contain only alphabets.';
      }

      // Validate phone number (exactly 10 digits)
      const phoneRegex = /^[0-9]{10}$/;
      if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
        validationErrors.phoneNumber =
          'Phone number must be exactly 10 digits.';
      }

      // Validate email (basic email regex)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        validationErrors.email = 'Please enter a valid email address.';
      }

      // Password and confirm password validation
      if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        validationErrors.password = 'Passwords do not match.';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sending the data to the backend (registration)
    if (!isLogin) {
      axios
        .post('http://localhost:8080/CodingGame/registration', formData)
        .then((response) => {
          console.log('User registered successfully', response.data);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }

    // Login logic
    if (isLogin) {
      axios
        .post('http://localhost:8080/CodingGame/login', formData)
        .then((response) => {
          console.log('User Login successfully', response.data);
          // After successful login, navigate to dashboard or another route
        })
        .catch((error) => {
          console.error('There was an error with login!', error);
        });
    }

    alert(isLogin ? 'Login successful!' : 'Registration successful!');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({}); // Reset errors when toggling forms
  };

  // General onChange handler for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform validation for specific fields
    let validationErrors = { ...errors };

    // Validate first name and last name (only alphabets and spaces allowed)
    if (name === 'firstName' || name === 'lastName') {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (name === 'firstName' && value && !nameRegex.test(value)) {
        validationErrors.firstName = 'First Name must contain only alphabets.';
      } else if (name === 'lastName' && value && !nameRegex.test(value)) {
        validationErrors.lastName = 'Last Name must contain only alphabets.';
      } else {
        // Remove error if validation passes
        delete validationErrors.firstName;
        delete validationErrors.lastName;
      }
    }

    // Validate phone number (exactly 10 digits)
    if (name === 'phoneNumber') {
      const phoneRegex = /^[0-9]{10}$/;
      if (value && !phoneRegex.test(value)) {
        validationErrors.phoneNumber =
          'Phone number must be exactly 10 digits.';
      } else {
        // Remove error if validation passes
        delete validationErrors.phoneNumber;
      }
    }

    setErrors(validationErrors);
  };

  return (
    <div className="container">
      {/* Left side with text */}
      <div className={`left-side ${!isLogin ? 'hidden' : ''}`}>
        <div className="coding-game">
          <h1>CODING GAME</h1>
        </div>
        <h1 className="creative-heading">Eat..</h1>
        <h1 className="creative-heading">Code...</h1>
        <h1 className="creative-heading">Sleep....</h1>
        <h1 className="creative-heading">Repeat.....</h1>
      </div>

      {/* Right side with form */}
      <div className={`right-side ${!isLogin ? 'expanded' : ''}`}>
        <div className="form-container">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>

          {/* Form - Login or Register */}
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <p className="error-message">{errors.general}</p>
            )}

            {isLogin ? (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Username"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.general && (
                  <p className="error-message">{errors.general}</p>
                )}
                <button type="submit">Login</button>
              </>
            ) : (
              <div>
                {/* Registration form */}
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName}</p>
                )}

                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName}</p>
                )}

                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="error-message">{errors.phoneNumber}</p>
                )}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}

                <input
                  type="tel"
                  name="otp"
                  placeholder="Otp"
                  value={formData.otp}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="educationQualification"
                  placeholder="Education Qualification"
                  value={formData.educationQualification}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="programmingLanguage"
                  placeholder="Programming Language"
                  value={formData.programmingLanguage}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}

                <button type="submit">Register</button>
              </div>
            )}
          </form>

          {/* Toggle button for switching between Login and Register */}
          <div className="form-toggle">
            <button onClick={toggleForm} className="toggle-btn">
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

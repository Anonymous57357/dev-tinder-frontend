import { useState } from 'react';

import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isSignIn, setIsSignIn] = useState(false);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginIn = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login/`,
        { emailId, password },
        { withCredentials: true }
      );

      console.log(res.data);
      dispatch(addUser(res.data));

      navigate('/');
    } catch (error) {
      setResponse(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      console.log(res.data);

      dispatch(addUser(res.data));
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isSignIn ? 'Sign Up' : 'Login'}
          </h2>
          <div>
            {isSignIn && (
              <>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-4 relative">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                >
                  {isPasswordVisible ? (
                    // Open eye icon (visible password)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    // Eye with slash icon (hidden password)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223a9.907 9.907 0 018.02-4.223c5.245 0 9.604 4.052 10.5 7-1.058 2.866-5.118 7-10.5 7-2.267 0-4.424-.915-6.02-2.2m-2.27-2.42l.27-.38M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </label>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isSignIn ? handleSignIn : handleLoginIn}
            >
              {isSignIn ? 'Sign Up' : 'Login In'}
            </button>
            <p
              className="cursor-pointer"
              onClick={() => {
                setIsSignIn((value) => !value);
              }}
            >
              {isSignIn
                ? 'You are already signed Up. Please proceed to login.'
                : 'New here? Create an account to get started.'}
            </p>
          </div>
          <p className="text-red-400 font-sans font-medium text-lg">
            {response}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

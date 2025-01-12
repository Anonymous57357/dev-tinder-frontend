import { useState } from 'react';

import { BASE_URL } from '../utils/constants';
import axios, { formToJSON } from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
      setResponse(error.response.data.error);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
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
            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
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

import { useState } from 'react';

import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [emailId, setEmailId] = useState('elon@musk.com');
  const [password, setPassword] = useState('Techa@123#');
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login/`,
        { emailId, password },
        { withCredentials: true }
      );

      const data = res.data;
      dispatch(addUser(data));

      setResponse(data.message);
      navigate('/');
    } catch (error) {
      setResponse(error.message);
      console.error(
        'API Error:',
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
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
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          </div>
          {<p>{response}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

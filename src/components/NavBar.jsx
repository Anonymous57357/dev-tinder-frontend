import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  // subscriptions
  const user = useSelector((store) => store.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });

      dispatch(removeUser());

      return navigate('/login');
    } catch (error) {
      console.error(error);
      // error page for furether good exprerience
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-5 flex ">
            <p className="form-control">Welcome, {user.data.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.data.photoUrl} alt="user photo" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

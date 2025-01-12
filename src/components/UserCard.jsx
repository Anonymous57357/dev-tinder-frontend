import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender, _id } = user; // feed api user data
  console.log(user);

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      // the purpose of the api is just send interested or ignored request to the feed user
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + userId,
        {},
        { withCredentials: true }
      );

      console.log(res.data.user);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="user_photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + ', ' + gender}</p>}

        <div className="card-actions justify-center my-4 ">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest('ignored', _id)}
          >
            Ignore
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

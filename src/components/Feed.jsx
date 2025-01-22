import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);

  const navigate = useNavigate();

  const dispatch = useDispatch();
 const feedData = async () => {
  try {
    const res = await axios.get(BASE_URL + '/feed', {
      withCredentials: true,
    });
    dispatch(addFeed(res.data));
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      navigate('/login'); // Ensure this redirects unauthenticated users
    } else {
      console.error("Error fetching feed:", error);
    }
  }
};

  useEffect(() => {
    feedData();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center text-xl py-10">No new users found!</h1>
    );

  return (
    feed && (
      <div className="flex justify-center mr-10 py-8">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

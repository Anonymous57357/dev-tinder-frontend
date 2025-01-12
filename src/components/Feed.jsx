import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  // console.log(feed);

  const dispatch = useDispatch();
  const feedData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });

      console.log(res.data);

      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
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

import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests === null) return null;

  if (requests.length === 0) {
    return (
      <h1 className="text-center text-gray-500 text-lg mt-10">
        No requests found!
      </h1>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center font-bold text-2xl mb-6 text-gray-100">
        Your Requests
      </h1>
      <div className="flex flex-col items-center gap-6">
        {requests.map((request) => {
          const { firstName, lastName, about, age, gender, photoUrl, _id } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="card w-full md:w-1/2 bg-gray-800 text-white shadow-xl p-6 border border-gray-700"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={photoUrl || 'https://via.placeholder.com/150'}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                <p className="text-sm text-gray-300">{about}</p>
                <div className="mt-2">
                  <p className="text-sm">
                    <strong>Age:</strong> {age}
                  </p>
                  <p className="text-sm">
                    <strong>Gender:</strong> {gender}
                  </p>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    className="btn btn-primary w-24"
                    onClick={() => reviewRequest('accepted', request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary w-24"
                    onClick={() => reviewRequest('rejected', request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

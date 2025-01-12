import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connection', {
        withCredentials: true,
      });

      console.log(res.data);

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections === null) return null;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-gray-500 text-lg mt-10">
        No connections found!
      </h1>
    );

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center font-bold text-2xl mb-6 text-gray-100">
        Your Connections
      </h1>
      <div className="flex flex-col items-center gap-6">
        {connections.map((connection, index) => {
          const { firstName, lastName, about, age, gender, photoUrl } =
            connection;
          return (
            <div
              key={index}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

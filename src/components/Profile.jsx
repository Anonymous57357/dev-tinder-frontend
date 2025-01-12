import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user?.data); // optionall chaining is chaining unitill reach the end to find value

  return (
    user && (
      <div>
        <EditProfile user={user?.data} />
      </div>
    )
  );
};

export default Profile;

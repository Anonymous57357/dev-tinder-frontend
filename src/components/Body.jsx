import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Body = () => {
  // const dispatch = useDispatch();
  // const fetchUser = async () => {
  //   try {
  //     const user = axios.get(BASE_URL + '/profile/view');
  //     console.log(user);

  //     dispatch(addUser(user.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  return (
    <div className="body-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
const Body = () => {
  return (
    <div className="body-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

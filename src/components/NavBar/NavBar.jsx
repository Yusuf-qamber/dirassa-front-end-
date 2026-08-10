import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './NavBar.scss';
import { googleLogout } from '@react-oauth/google';

const NavBar = ({ user, handleSignOut }) => {
  const { college } = useParams();

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">Dirassa</Link>
      </div>

      <ul className="navbar__menu">
        {user ? (
          <>
            <li>
              <Link to="/profile" className="navbar__welcome">
                Hi, {user.username}
              </Link>
            </li>
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

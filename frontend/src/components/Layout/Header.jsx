import { useNavigate } from "react-router-dom";
import Book from "../../assets/icons/Book";
import { useAuthContext } from "../../context/hooks";

const Header = () => {
  const { isAuthenticated, user, logoutFunc } = useAuthContext();
  const navigate = useNavigate();
  return (
    <nav className="header">
      <Book />
      <div className="nav-right">
        {isAuthenticated ? (
          <div className="user-info">
            <div className="user-name">{user?.first_name}</div>
            <button
              onClick={logoutFunc}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-500/95"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="button-outlined"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="button-outlined"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

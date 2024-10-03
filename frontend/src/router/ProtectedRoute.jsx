import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/hooks";
import FullPageLoader from "../components/Layout/FullPageLoader";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ outlet }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, loading]);

  if (loading) {
    return <FullPageLoader />;
  }

  return isAuthenticated ? outlet : null;
};

export default ProtectedRoute;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  return accessToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

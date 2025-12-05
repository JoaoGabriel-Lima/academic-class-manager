import useTokenStore from "@/stores/token.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const tokenResponse = useTokenStore((s) => s.tokenResponse);

  const location = useLocation();
  // const navigate = useNavigate();


  if (tokenResponse.idUsuario > 0) {
    return <Outlet /> 
  }
  else {
    // navigate("/login");
    return <Navigate to="/login" state={{destino: location.pathname}} />
  }
};
export default PrivateRoutes;
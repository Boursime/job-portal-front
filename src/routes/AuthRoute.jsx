import {useAuth} from "@/contexts/AuthContext"
import { Forbidden } from "@/pages/system/Forbidden";

import Loading from "@/pages/system/Loading";
export const AuthRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Forbidden />;
  }

  

  return children;
};

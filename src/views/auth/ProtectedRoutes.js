import { useAuth } from "context/AuthProvider";
import { Redirect } from 'react-router-dom'


const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="animate-pulse">{children}</div>;

    if (!user) return <Redirect to="/auth/login" />;
    
    return <>{children}</>;
}

export default ProtectedRoutes;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    
    // Get user role from metadata or determine based on login method
    const userRole = user?.publicMetadata?.role as string || 
                    (user?.primaryEmailAddress?.emailAddress?.endsWith('edu.ng') ? 'teacher' : 'student');
    
    // Redirect based on role
    if (userRole === 'teacher') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  }, [isLoaded, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="mt-4 text-lg">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default Dashboard;

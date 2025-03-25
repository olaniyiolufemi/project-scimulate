
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
          <span className="text-4xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          We couldn't find the page you were looking for. The page might have been moved or deleted.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="px-6 py-6 text-lg hover-lift"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Return to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;

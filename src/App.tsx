
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn } from "@clerk/clerk-react";
import { useState } from "react";

// Pages
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Experiment from "./pages/Experiment";
import ClerkSetupGuide from "./components/ClerkSetupGuide";

// Set up react-query
const queryClient = new QueryClient();

// Clerk publishable key - using the provided key
const PUBLISHABLE_KEY = "pk_test_dmlhYmxlLWJ1ZmZhbG8tOTguY2xlcmsuYWNjb3VudHMuZGV2JA";

const App = () => {
  const [isClerkReady, setIsClerkReady] = useState(Boolean(PUBLISHABLE_KEY && !PUBLISHABLE_KEY.includes("YourClerkKeyHere")));

  // If no valid Clerk key is provided, render the setup guide
  if (!isClerkReady) {
    return <ClerkSetupGuide />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        appearance={{
          variables: {
            colorPrimary: 'hsl(199, 89%, 48%)',
            colorBackground: 'hsl(210, 50%, 98%)',
            colorText: 'hsl(222, 47%, 11%)',
            colorInputBackground: 'white',
            colorInputText: 'hsl(222, 47%, 11%)',
            colorDanger: 'hsl(0, 84.2%, 60.2%)'
          },
          elements: {
            card: "glass-card rounded-xl shadow-lg",
            formButtonPrimary: "bg-primary hover:bg-primary/90 transition-all",
            formFieldInput: "bg-white/80 backdrop-blur-sm border border-border",
            rootBox: {
              boxShadow: "none",
              backgroundColor: "hsl(210, 50%, 98%)",
              color: "hsl(222, 47%, 11%)"
            },
            footerActionLink: {
              color: "hsl(199, 89%, 48%)",
              fontWeight: 500
            },
            headerTitle: {
              fontSize: "1.5rem",
              fontWeight: 600
            }
          }
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/student"
                element={
                  <SignedIn>
                    <StudentDashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/teacher"
                element={
                  <SignedIn>
                    <TeacherDashboard />
                  </SignedIn>
                }
              />
              <Route
                path="/experiment/:id"
                element={
                  <SignedIn>
                    <Experiment />
                  </SignedIn>
                }
              />
              
              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default App;

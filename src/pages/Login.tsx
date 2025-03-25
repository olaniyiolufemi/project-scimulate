
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const teacherLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Define the form
  const form = useForm<z.infer<typeof teacherLoginSchema>>({
    resolver: zodResolver(teacherLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle teacher login
  const onTeacherSubmit = async (values: z.infer<typeof teacherLoginSchema>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!isLoaded) return;
      
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Welcome back!");
        navigate("/teacher");
      } else {
        console.error("Sign in result: ", result);
        setError("Something went wrong during login. Please try again.");
      }
    } catch (err: any) {
      console.error("Error during sign in: ", err);
      setError(err.errors?.[0]?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle student login (via Google)
  const handleStudentLogin = () => {
    openSignIn({
      redirectUrl: "/student",
      appearance: {
        elements: {
          rootBox: "mx-auto",
          card: "glass-card rounded-xl shadow-lg",
          formButtonPrimary: "bg-primary hover:bg-primary/90 transition-all",
        }
      }
    });
  };

  // If user is already signed in
  if (isSignedIn) {
    // Determine where to redirect based on user metadata or roles
    const redirectTo = user.publicMetadata.role === "teacher" ? "/teacher" : "/student";
    navigate(redirectTo);
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto"
        >
          <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Welcome to Scimulate</CardTitle>
              <CardDescription>
                Sign in to access the virtual science laboratory
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Students can sign in with their Google account
                    </p>
                    <Button 
                      onClick={handleStudentLogin}
                      className="w-full py-6 hover-lift"
                    >
                      Sign in with Google
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="teacher">
                  {error && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      {error}
                    </div>
                  )}
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onTeacherSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full py-6 hover-lift" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

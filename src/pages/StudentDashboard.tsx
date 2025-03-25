
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Beaker, Flame, Monitor, BookOpen, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { Flask } from "@/components/icons/FlaskIcon";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";

const experiments = [
  {
    id: "acid-base",
    title: "Acid-Base Titration",
    description: "Learn to determine the concentration of an acid or base using titration method.",
    icon: <Beaker className="h-8 w-8 text-primary" />,
    status: "available",
    level: "Intermediate",
    duration: "30 min",
    progress: 0,
  },
  {
    id: "flame-test",
    title: "Flame Test Experiment",
    description: "Identify metal ions by observing the characteristic color they produce in a flame.",
    icon: <Flame className="h-8 w-8 text-primary" />,
    status: "available",
    level: "Beginner",
    duration: "15 min",
    progress: 0,
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions & Balancing",
    description: "Understand chemical reactions and practice balancing chemical equations.",
    icon: <Flask className="h-8 w-8 text-primary" />,
    status: "available",
    level: "Advanced",
    duration: "45 min",
    progress: 0,
  }
];

// Recent activity data
const recentActivity = [
  {
    id: 1,
    title: "Welcome to Scimulate",
    type: "system",
    time: "Just now"
  }
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen blue-gradient-bg">
      <Header userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="glass-card border-0 soft-shadow overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-gradient">
                        Welcome, {user?.firstName || "Student"}!
                      </CardTitle>
                      <CardDescription>
                        Continue your scientific journey with these experiments.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-secondary/60 p-4 rounded-lg">
                      <Monitor className="h-7 w-7 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">3 Experiments</p>
                    </div>
                    <div className="bg-secondary/60 p-4 rounded-lg">
                      <BookOpen className="h-7 w-7 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">WAEC Aligned</p>
                    </div>
                    <div className="bg-secondary/60 p-4 rounded-lg">
                      <Clock className="h-7 w-7 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">~90 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experiments section */}
            <div>
              <h2 className="text-2xl font-bold mb-4 pl-1">Available Experiments</h2>
              <div className="grid grid-cols-1 gap-5">
                {experiments.map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="glass-card border-0 soft-shadow hover-lift overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-secondary p-3 rounded-full mr-4">
                              {experiment.icon}
                            </div>
                            <div>
                              <CardTitle>{experiment.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {experiment.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge className="ml-auto bg-secondary text-primary">
                            {experiment.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Progress</span>
                          <span>{experiment.progress}%</span>
                        </div>
                        <Progress value={experiment.progress} className="h-2 bg-secondary" />
                        
                        <div className="flex items-center mt-4 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{experiment.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => navigate(`/experiment/${experiment.id}`)}
                          className="w-full gap-2"
                        >
                          Start Experiment <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User profile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="glass-card border-0 soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <div className="mb-4 p-1 rounded-full bg-secondary/60">
                    <UserButton />
                  </div>
                  <h3 className="font-medium text-lg">{user?.fullName || "Student"}</h3>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  
                  <div className="mt-5 w-full">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Completion</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2 bg-secondary" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Recent activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="glass-card border-0 soft-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start p-3 rounded-lg bg-secondary/40">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

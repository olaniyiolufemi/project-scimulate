import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  Users,
  BookOpen,
  BarChart3,
  Beaker,
  Flame,
  Clock,
  Eye,
  UserPlus,
  Zap,
  Bell
} from "lucide-react";
import { Flask } from "@/components/icons/FlaskIcon";
import Header from "@/components/Header";
import { Progress } from "@/components/ui/progress";

const experiments = [
  {
    id: "acid-base",
    title: "Acid-Base Titration",
    description: "Learn to determine the concentration of an acid or base using titration method.",
    icon: <Beaker className="h-6 w-6 text-primary" />,
    students: 0,
    level: "Intermediate",
    duration: "30 min",
  },
  {
    id: "flame-test",
    title: "Flame Test Experiment",
    description: "Identify metal ions by observing the characteristic color they produce in a flame.",
    icon: <Flame className="h-6 w-6 text-primary" />,
    students: 0,
    level: "Beginner",
    duration: "15 min",
  },
  {
    id: "chemical-reactions",
    title: "Chemical Reactions & Balancing",
    description: "Understand chemical reactions and practice balancing chemical equations.",
    icon: <Flask className="h-6 w-6 text-primary" />,
    students: 0,
    level: "Advanced",
    duration: "45 min",
  }
];

const notifications = [
  {
    id: 1,
    title: "Welcome to Scimulate",
    message: "Thanks for joining as a teacher. You can now assign experiments to students.",
    time: "Just now",
    read: false
  }
];

const TeacherDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header userType="teacher" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">0</div>
                      <Users className="h-8 w-8 text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Experiments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">3</div>
                      <BookOpen className="h-8 w-8 text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">0%</div>
                      <BarChart3 className="h-8 w-8 text-primary opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            
            {/* Experiments management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Available Experiments</h2>
                <Button variant="outline" size="sm">
                  <Zap className="mr-2 h-4 w-4" /> Quick Assign
                </Button>
              </div>
              
              <div className="space-y-4">
                {experiments.map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="glass-card dark:glass-card-dark border-0 shadow-md hover-lift overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                              {experiment.icon}
                            </div>
                            <div>
                              <CardTitle>{experiment.title}</CardTitle>
                              <CardDescription className="mt-1">
                                {experiment.description}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-auto">
                            {experiment.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{experiment.duration}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{experiment.students} students assigned</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>
                        <Button size="sm">
                          <UserPlus className="mr-2 h-4 w-4" /> Assign to Students
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
              <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Teacher Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <UserButton />
                  </div>
                  <h3 className="font-medium text-lg">{user?.fullName || "Teacher"}</h3>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                  <Badge className="mt-2" variant="outline">Science Teacher</Badge>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Manage Profile</Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">Notifications</CardTitle>
                  <Badge variant="outline">{notifications.length}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-sm">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Card className="glass-card dark:glass-card-dark border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Activity Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Student Engagement</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Experiment Completion</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
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

export default TeacherDashboard;

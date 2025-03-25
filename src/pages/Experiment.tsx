
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Info, PlayCircle, ListChecks, BookOpen, Award, Beaker, Flame, RefreshCw, ChevronRight } from "lucide-react";
import { Flask } from "@/components/icons/FlaskIcon";
import { toast } from "sonner";
import AcidBaseTitration from "@/components/simulations/AcidBaseTitration";
import FlameTest from "@/components/simulations/FlameTest";
import ChemicalReactions from "@/components/simulations/ChemicalReactions";
import Header from "@/components/Header";
import AssessmentQuiz from "@/components/assessment/AssessmentQuiz";
import { assessmentDataMap } from "@/data/assessmentData";

const experiments = {
  "acid-base": {
    id: "acid-base",
    title: "Acid-Base Titration",
    description: "Learn to determine the concentration of an acid or base using titration method.",
    icon: <Beaker className="h-8 w-8 text-primary" />,
    level: "Intermediate",
    duration: "30 min",
    objective: "Determine the concentration of a sodium hydroxide (NaOH) solution by titrating it against a standard solution of hydrochloric acid (HCl).",
    theory: "Titration is a common laboratory method used to determine the unknown concentration of an acid or base by neutralizing it with a standard solution of known concentration. The endpoint of the titration is detected using an indicator that changes color when neutralization is complete.",
    component: AcidBaseTitration
  },
  "flame-test": {
    id: "flame-test",
    title: "Flame Test Experiment",
    description: "Identify metal ions by observing the characteristic color they produce in a flame.",
    icon: <Flame className="h-8 w-8 text-primary" />,
    level: "Beginner",
    duration: "15 min",
    objective: "Identify different metal ions by observing the characteristic colors they produce when heated in a flame.",
    theory: "When metal ions are heated in a flame, the electrons become excited and jump to higher energy levels. When these electrons return to their ground state, they emit energy in the form of light of specific wavelengths, resulting in characteristic flame colors for different metals.",
    component: FlameTest
  },
  "chemical-reactions": {
    id: "chemical-reactions",
    title: "Chemical Reactions & Balancing",
    description: "Understand chemical reactions and practice balancing chemical equations.",
    icon: <Flask className="h-8 w-8 text-primary" />,
    level: "Advanced",
    duration: "45 min",
    objective: "Learn how to balance chemical equations and observe different types of chemical reactions.",
    theory: "Chemical reactions must be balanced to satisfy the law of conservation of mass. This means that the number of atoms of each element must be the same on both sides of the equation. Different types of reactions include synthesis, decomposition, single displacement, double displacement, and combustion.",
    component: ChemicalReactions
  }
};

const Experiment = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [experimentCompleted, setExperimentCompleted] = useState(false);
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);
  const [assessmentPassed, setAssessmentPassed] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if experiment ID is valid
    if (!id || !experiments[id as keyof typeof experiments]) {
      toast.error("Experiment not found!");
      navigate("/student");
    }
  }, [id, navigate]);

  const experiment = id ? experiments[id as keyof typeof experiments] : null;
  const ExperimentComponent = experiment?.component;
  const assessmentData = id ? assessmentDataMap[id] : null;

  const handleRestart = () => {
    if (ExperimentComponent) {
      setProgress(0);
      setExperimentCompleted(false);
      setAssessmentScore(null);
      setAssessmentPassed(null);
      toast.info("Experiment restarted");
    }
  };

  const handleComplete = () => {
    setProgress(100);
    setExperimentCompleted(true);
    toast.success("Experiment completed successfully!");
  };

  const handleAssessmentComplete = (score: number, passed: boolean) => {
    setAssessmentScore(score);
    setAssessmentPassed(passed);
    setProgress(passed ? 100 : Math.max(progress, 75)); // If passed, set to 100%, otherwise at least 75%
  };

  if (!experiment) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 dark:from-background dark:to-background/80">
      <Header userType="student" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back button and experiment header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 hover:bg-background/80"
            onClick={() => navigate("/student")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                {experiment.icon}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{experiment.title}</h1>
                <p className="text-muted-foreground">{experiment.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:self-start">
              <Button variant="outline" size="sm" onClick={handleRestart} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Restart
              </Button>
            </div>
          </motion.div>
          
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1 bg-muted/60 px-2 py-1 rounded-full">
                <Info className="h-3.5 w-3.5" />
                <span>{experiment.level}</span>
              </div>
              <div className="flex items-center gap-1 bg-muted/60 px-2 py-1 rounded-full">
                <PlayCircle className="h-3.5 w-3.5" />
                <span>{experiment.duration}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">Progress</span>
              <div className="w-32 flex items-center gap-2">
                <Progress value={progress} className="h-2" />
                <span className="text-xs font-medium w-9 text-right">{progress}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
              <TabsList className="w-full grid grid-cols-3 p-1 h-12">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> 
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="simulation" className="flex items-center gap-2">
                  <Beaker className="h-4 w-4" />
                  <span>Simulation</span>
                </TabsTrigger>
                <TabsTrigger value="assessment" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  <span>Assessment</span>
                </TabsTrigger>
              </TabsList>
            </Card>
            
            <TabsContent value="overview" className="mt-6">
              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <CardTitle>Experiment Overview</CardTitle>
                  <CardDescription>Understanding the purpose and theory behind this experiment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
                      Objective
                    </h3>
                    <p className="text-muted-foreground ml-3">{experiment.objective}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
                      Theory
                    </h3>
                    <p className="text-muted-foreground ml-3">{experiment.theory}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <span className="inline-block w-1 h-5 bg-primary rounded-full"></span>
                      Instructions
                    </h3>
                    <ol className="ml-3 space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs">1</span>
                        <span>Read the theory and objective carefully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs">2</span>
                        <span>Navigate to the Simulation tab to begin the experiment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs">3</span>
                        <span>Follow the on-screen instructions in the simulation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs">4</span>
                        <span>Take notes of your observations and results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs">5</span>
                        <span>Complete the assessment to test your understanding</span>
                      </li>
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 pt-4">
                  <Button onClick={() => setActiveTab("simulation")} className="w-full sm:w-auto gap-2">
                    Start Simulation <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="simulation" className="mt-6">
              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <CardTitle>Interactive Simulation</CardTitle>
                  <CardDescription>Perform the experiment in a virtual environment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="canvas-container rounded-lg overflow-hidden bg-white dark:bg-gray-900 border shadow-inner min-h-[400px] flex items-center justify-center">
                    {ExperimentComponent && <ExperimentComponent onComplete={handleComplete} />}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("assessment")}
                    disabled={!experimentCompleted}
                  >
                    Go to Assessment <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="assessment" className="mt-6">
              <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardHeader>
                  <CardTitle>Assessment</CardTitle>
                  <CardDescription>Test your knowledge about this experiment</CardDescription>
                </CardHeader>
                <CardContent>
                  {!experimentCompleted ? (
                    <div className="text-center py-12">
                      <div className="bg-muted/40 rounded-full p-6 inline-flex">
                        <ListChecks className="h-16 w-16 text-primary/60" />
                      </div>
                      <h3 className="text-xl font-semibold mt-4 mb-2">Complete the Simulation First</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        You need to complete the simulation before taking the assessment.
                        This ensures you've had the opportunity to observe and learn from the experiment.
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-6" 
                        onClick={() => setActiveTab("simulation")}
                      >
                        Return to Simulation
                      </Button>
                    </div>
                  ) : assessmentData ? (
                    <AssessmentQuiz
                      assessmentData={assessmentData}
                      onComplete={handleAssessmentComplete}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-muted/40 rounded-full p-6 inline-flex">
                        <Award className="h-16 w-16 text-primary/60" />
                      </div>
                      <h3 className="text-xl font-semibold mt-4 mb-2">Assessment Not Available</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        The assessment for this experiment is currently being developed. 
                        Please check back later to test your knowledge.
                      </p>
                    </div>
                  )}
                </CardContent>
                {experimentCompleted && assessmentScore !== null && (
                  <CardFooter className="bg-muted/20 pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate("/student")}
                    >
                      Return to Dashboard
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Experiment;

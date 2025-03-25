import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, ChevronRight, Beaker, RefreshCw, Eraser } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

type AcidBaseTitrationProps = {
  onComplete?: () => void;
};

const AcidBaseTitration: React.FC<AcidBaseTitrationProps> = ({ onComplete }) => {
  // State management for the experiment
  const [step, setStep] = useState<number>(0);
  const [titrantAdded, setTitrantAdded] = useState<number>(0);
  const [dropRate, setDropRate] = useState<number>(1);
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [solutionColor, setSolutionColor] = useState<string>("#f3f4f6"); // starting color
  const [phValue, setPhValue] = useState<number>(7.0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showEquation, setShowEquation] = useState<boolean>(false);
  const [hasReachedEndpoint, setHasReachedEndpoint] = useState<boolean>(false);
  const [hasReset, setHasReset] = useState<boolean>(false);
  const [calculatedMolarity, setCalculatedMolarity] = useState<string>("");
  const [userMolarity, setUserMolarity] = useState<string>("");
  const [showHint, setShowHint] = useState<boolean>(false);
  
  // Colors based on pH indicator
  const getColorForPh = (ph: number) => {
    if (ph < 4.4) return "#ff5252"; // red
    if (ph < 6.2) return "#ffeb3b"; // yellow
    if (ph < 8.0) return "#4caf50"; // green
    if (ph < 9.6) return "#2196f3"; // blue
    return "#9c27b0"; // purple
  };

  // Change pH based on titrant added
  useEffect(() => {
    // This simplified model assumes:
    // - Initial pH = 7.0
    // - Equal concentrations of acid and base
    // - 25 mL of 0.1M acid with 0.1M base titrant
    // - Endpoint at approximately 25 mL
    
    // Calculate the new pH
    let newPh = 7.0;
    
    if (titrantAdded < 24.5) {
      // Initial acid region
      newPh = 3.5 - Math.log10(0.1 - (titrantAdded/25) * 0.1);
    } else if (titrantAdded >= 24.5 && titrantAdded <= 25.5) {
      // Near equivalence point - rapid change
      const diff = Math.abs(titrantAdded - 25);
      if (diff < 0.1) {
        newPh = 7.0;
        // Set the endpoint reached flag when we're very close to the equivalence point
        if (!hasReachedEndpoint) {
          setHasReachedEndpoint(true);
          toast.info("You've reached the equivalence point!");
        }
      } else if (titrantAdded < 25) {
        newPh = 7.0 - (25 - titrantAdded) * 20;
      } else {
        newPh = 7.0 + (titrantAdded - 25) * 20;
      }
      newPh = Math.max(3.5, Math.min(10.5, newPh));
    } else {
      // Basic region - excess base
      newPh = 14 - (-Math.log10((titrantAdded/25 - 1) * 0.1));
      
      // If we've gone past the endpoint, make sure hasReachedEndpoint is true
      if (!hasReachedEndpoint && titrantAdded > 25.5) {
        setHasReachedEndpoint(true);
        toast.info("You've passed the equivalence point!");
      }
    }
    
    // Update the pH
    setPhValue(parseFloat(newPh.toFixed(2)));
    
    // Update the solution color based on pH
    setSolutionColor(getColorForPh(newPh));
    
  }, [titrantAdded, hasReachedEndpoint]);

  // Logic for continuously adding titrant drops
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPouring && titrantAdded < 50) {
      interval = setInterval(() => {
        setTitrantAdded(prev => {
          const newValue = prev + (dropRate * 0.1);
          return parseFloat(newValue.toFixed(1));
        });
      }, 200);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPouring, titrantAdded, dropRate]);

  // Steps for the experiment
  const steps = [
    {
      title: "Setup",
      instructions: "You have an Erlenmeyer flask containing 25.0 mL of hydrochloric acid (HCl) with an unknown concentration. You'll use 0.1 M sodium hydroxide (NaOH) solution in the burette to determine the acid's concentration.",
    },
    {
      title: "Titration",
      instructions: "Slowly add the base solution from the burette to the acid in the flask. Control the drop rate with the slider. Watch for the color change that indicates the endpoint.",
    },
    {
      title: "Analysis",
      instructions: "Calculate the concentration of the HCl solution using the volume of NaOH solution added and the known concentration of NaOH.",
    }
  ];
  
  // Reset the experiment
  const handleReset = () => {
    setTitrantAdded(0);
    setDropRate(1);
    setIsPouring(false);
    setSolutionColor("#f3f4f6");
    setPhValue(7.0);
    setHasReachedEndpoint(false);
    setIsComplete(false);
    setCalculatedMolarity("");
    setUserMolarity("");
    setHasReset(true);
    toast.info("Experiment reset! You can start over.");
  };
  
  // Check the student's answer
  const checkAnswer = () => {
    if (!userMolarity) {
      toast.error("Please enter your calculated molarity");
      return;
    }
    
    try {
      const userAnswer = parseFloat(userMolarity);
      
      // Calculate the actual molarity: (V₂ × M₂) ÷ V₁
      // Where: V₂ = volume of NaOH at endpoint, M₂ = molarity of NaOH, V₁ = volume of acid
      const correctMolarity = (titrantAdded * 0.1) / 25.0;
      const formattedCorrectMolarity = correctMolarity.toFixed(3);
      setCalculatedMolarity(formattedCorrectMolarity);
      
      // Check if they're within 5% of the correct answer
      const percentError = Math.abs((userAnswer - correctMolarity) / correctMolarity) * 100;
      
      if (percentError <= 5) {
        toast.success("Excellent! Your calculated molarity is correct.");
        setIsComplete(true);
        if (onComplete) onComplete();
      } else {
        toast.error(`Your answer is off by ${percentError.toFixed(1)}%. Try again!`);
      }
    } catch (e) {
      toast.error("Please enter a valid number");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Experiment steps */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((s, i) => (
          <div 
            key={i} 
            className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
                ${step === i ? 'bg-primary text-primary-foreground' : 
                  step > i ? 'bg-primary/80 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {step > i ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="ml-2 text-sm font-medium hidden sm:inline">{s.title}</span>
            {i < steps.length - 1 && (
              <div className="mx-2 h-[2px] flex-1 bg-muted">
                <div 
                  className="h-full bg-primary transition-all" 
                  style={{ width: step > i ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current step instructions */}
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Step {step + 1}: {steps[step].title}</AlertTitle>
        <AlertDescription>
          {steps[step].instructions}
        </AlertDescription>
      </Alert>
      
      {/* Titration apparatus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full h-[300px]">
            {/* Burette */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[30px] h-[200px] bg-gray-100 dark:bg-gray-800 rounded-b-lg border border-gray-300 dark:border-gray-700 overflow-hidden">
              <div 
                className="absolute bottom-0 w-full bg-blue-400 dark:bg-blue-600 rounded-b-lg transition-all"
                style={{ height: `${Math.max(0, 100 - (titrantAdded/50 * 100))}%` }}
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-1">
                <span className="text-[10px] text-right">0 mL</span>
                <span className="text-[10px] text-right">25 mL</span>
                <span className="text-[10px] text-right">50 mL</span>
              </div>
            </div>
            
            {/* Tip */}
            <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-[4px] h-[20px] bg-gray-300 dark:bg-gray-700">
              {isPouring && (
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 70, opacity: 0 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.5,
                    repeatDelay: 0.1
                  }}
                  className="absolute top-[20px] left-0 w-[4px] h-[4px] rounded-full bg-blue-400 dark:bg-blue-600"
                />
              )}
            </div>
            
            {/* Flask */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="relative w-[100px] h-[80px] bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                <div 
                  className="absolute w-full transition-colors duration-300"
                  style={{ 
                    height: '70%', 
                    bottom: 0, 
                    backgroundColor: solutionColor,
                    transition: 'background-color 0.5s ease' 
                  }}
                />
              </div>
              <div className="w-[40px] h-[60px] mx-auto bg-gray-100 dark:bg-gray-800 border-x border-b border-gray-300 dark:border-gray-700" />
            </div>
          </div>
          
          {/* pH and volume display */}
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">pH Value</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-2xl font-bold text-center">{phValue.toFixed(1)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">Volume Added</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-2xl font-bold text-center">{titrantAdded.toFixed(1)} mL</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          {step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prepare Your Experiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Make sure the following components are prepared:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Burette filled with 0.1 M NaOH solution</li>
                  <li>Flask with 25.0 mL of unknown concentration HCl</li>
                  <li>A few drops of phenolphthalein indicator added to the acid</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  In a real lab, you would need to properly clean and prepare all equipment, 
                  and carefully measure your solutions.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setStep(1)} className="w-full">
                  Start Titration <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Perform Titration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dropRate">Drop Rate</Label>
                  <Slider 
                    id="dropRate"
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[dropRate]} 
                    onValueChange={(vals) => setDropRate(vals[0])}
                    disabled={isComplete}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={isPouring ? "secondary" : "default"}
                    onClick={() => setIsPouring(!isPouring)}
                    className="flex-1"
                    disabled={isComplete || titrantAdded >= 50}
                  >
                    {isPouring ? "Stop" : "Start"} Titration
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={titrantAdded === 0}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                <Alert variant="default" className={hasReachedEndpoint ? "bg-primary/20" : ""}>
                  <div className="flex items-center">
                    <Beaker className="h-4 w-4 mr-2" />
                    <p className="text-sm">
                      {hasReachedEndpoint 
                        ? "Color change detected! You've reached the endpoint of the titration."
                        : "Add the base solution until you see a color change that persists for at least 30 seconds."
                      }
                    </p>
                  </div>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full"
                  disabled={!hasReachedEndpoint}
                >
                  Proceed to Analysis <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calculate Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Use the volume of NaOH added at the endpoint to calculate the 
                  molarity of the HCl solution.
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowEquation(!showEquation)}
                >
                  {showEquation ? "Hide Equation" : "Show Equation"}
                </Button>
                
                {showEquation && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-mono text-center">
                      Molarity of HCl = (V<sub>NaOH</sub> × M<sub>NaOH</sub>) ÷ V<sub>HCl</sub>
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Where:
                      <br />V<sub>NaOH</sub> = Volume of NaOH added at the endpoint (mL)
                      <br />M<sub>NaOH</sub> = Molarity of NaOH solution (0.1 M)
                      <br />V<sub>HCl</sub> = Volume of HCl solution (25.0 mL)
                    </p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="molarity">
                    Your calculated molarity (M)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="molarity"
                      type="number"
                      step="0.001"
                      placeholder="e.g., 0.123"
                      disabled={isComplete}
                      value={userMolarity}
                      onChange={(e) => setUserMolarity(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowHint(!showHint)}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {showHint && (
                  <Alert variant="default" className="bg-muted/50">
                    <AlertTitle>Hint</AlertTitle>
                    <AlertDescription className="text-sm">
                      The endpoint was reached when {titrantAdded.toFixed(1)} mL of 0.1 M NaOH 
                      solution was added to 25.0 mL of HCl solution. Use the formula to 
                      calculate the molarity.
                    </AlertDescription>
                  </Alert>
                )}
                
                {calculatedMolarity && (
                  <Alert 
                    variant={isComplete ? "default" : "destructive"}
                    className={isComplete ? "bg-primary/20" : ""}
                  >
                    <AlertTitle>
                      {isComplete ? "Correct!" : "Try Again"}
                    </AlertTitle>
                    <AlertDescription>
                      The molarity of the HCl solution is {calculatedMolarity} M.
                      {!isComplete && " Your answer was incorrect. Check your calculation and try again."}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleReset} 
                  className="flex-1"
                >
                  <Eraser className="mr-2 h-4 w-4" /> Reset Experiment
                </Button>
                <Button 
                  onClick={checkAnswer}
                  disabled={isComplete || !userMolarity}
                  className="flex-1"
                >
                  Submit Answer
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      <style>
        {`
          .animate-drop {
            animation: drop 1s linear infinite;
          }
          
          @keyframes drop {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(80px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default AcidBaseTitration;

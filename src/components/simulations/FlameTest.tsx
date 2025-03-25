
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PlayCircle, Flame } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FlameTestProps {
  onComplete?: () => void;
}

const FlameTest: React.FC<FlameTestProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null);
  const [showingFlame, setShowingFlame] = useState(false);
  const [testedMetals, setTestedMetals] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const metals = [
    { id: "lithium", name: "Lithium (Li)", color: "#FF3333", flameColor: "crimson" },
    { id: "sodium", name: "Sodium (Na)", color: "#FFD700", flameColor: "gold" },
    { id: "potassium", name: "Potassium (K)", color: "#AC30FF", flameColor: "mediumpurple" },
    { id: "calcium", name: "Calcium (Ca)", color: "#FF5733", flameColor: "darkorange" },
    { id: "copper", name: "Copper (Cu)", color: "#00FF00", flameColor: "limegreen" },
    { id: "barium", name: "Barium (Ba)", color: "#7FFF00", flameColor: "greenyellow" }
  ];

  const handleStart = () => {
    setHasStarted(true);
    toast.info("Experiment started! Select a metal and observe its flame color.");
  };

  const handleSelectMetal = (id: string) => {
    setSelectedMetal(id);
  };

  const handleTestFlame = () => {
    if (!selectedMetal) {
      toast.error("Please select a metal first!");
      return;
    }

    setShowingFlame(true);
    
    // Add to tested metals if not already tested
    if (!testedMetals.includes(selectedMetal)) {
      setTestedMetals([...testedMetals, selectedMetal]);
    }

    // If all metals have been tested, mark as complete
    if (testedMetals.length === metals.length - 1 && !testedMetals.includes(selectedMetal)) {
      setIsComplete(true);
      onComplete && onComplete();
      toast.success("Experiment complete! You've tested all the metals.");
    }

    // Hide flame after 3 seconds
    setTimeout(() => {
      setShowingFlame(false);
    }, 3000);
  };

  const getFlameColor = () => {
    const metal = metals.find(m => m.id === selectedMetal);
    return metal ? metal.flameColor : "yellow";
  };

  return (
    <div className="w-full h-full p-4">
      {!hasStarted ? (
        <div className="text-center max-w-md mx-auto py-12">
          <h3 className="text-xl font-semibold mb-4">Flame Test Experiment</h3>
          <p className="mb-6 text-muted-foreground">
            In this experiment, you will identify different metal ions by observing the characteristic colors they produce when heated in a flame.
          </p>
          <Button onClick={handleStart} className="w-full py-6">
            <PlayCircle className="mr-2 h-5 w-5" /> Start Experiment
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flame visualization */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative bg-gray-900 w-full max-w-sm h-64 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {/* Bunsen burner */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-20 bg-gray-600 rounded-t-md"></div>
              
              {/* Flame */}
              <AnimatePresence>
                {showingFlame && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                    style={{ zIndex: 10 }}
                  >
                    <div className="relative">
                      {/* Inner flame */}
                      <div 
                        className="w-8 h-24 rounded-t-full"
                        style={{ 
                          background: `linear-gradient(to top, ${getFlameColor()}, transparent)`,
                          boxShadow: `0 0 20px ${getFlameColor()}, 0 0 40px ${getFlameColor()}80`
                        }}
                      ></div>
                      
                      {/* Outer flame glow */}
                      <div 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-32 rounded-t-full opacity-30"
                        style={{ 
                          background: `radial-gradient(ellipse at center, ${getFlameColor()}, transparent 70%)`,
                          filter: `blur(8px)`
                        }}
                      ></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Wire loop with metal sample */}
              {selectedMetal && (
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-16 bg-gray-500"></div>
                  <div className="absolute top-0 left-0 w-4 h-4 border-2 border-gray-500 rounded-full transform -translate-x-1.5 -translate-y-2"></div>
                  <motion.div
                    className="absolute top-0 left-0 w-3 h-3 rounded-full transform -translate-x-1 -translate-y-1.5"
                    style={{ 
                      backgroundColor: metals.find(m => m.id === selectedMetal)?.color || "#FFF"
                    }}
                    animate={{ opacity: showingFlame ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              )}
            </div>
            
            <Button
              onClick={handleTestFlame}
              disabled={!selectedMetal || showingFlame}
              className="w-full max-w-sm"
            >
              <Flame className="mr-2 h-4 w-4" /> 
              Test in Flame
            </Button>
            
            {isComplete && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-md w-full max-w-sm">
                <p className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                  Experiment complete! You've tested all the metals.
                </p>
              </div>
            )}
          </div>
          
          {/* Metal selection */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Select a Metal Compound</h3>
                <RadioGroup 
                  value={selectedMetal || ""}
                  onValueChange={handleSelectMetal}
                  className="space-y-2"
                >
                  {metals.map((metal) => (
                    <div 
                      key={metal.id}
                      className={`flex items-center space-x-2 p-2 rounded-md ${
                        testedMetals.includes(metal.id) ? "bg-primary/5" : ""
                      }`}
                    >
                      <RadioGroupItem value={metal.id} id={metal.id} />
                      <Label htmlFor={metal.id} className="flex items-center justify-between w-full">
                        <span>{metal.name}</span>
                        {testedMetals.includes(metal.id) && (
                          <span 
                            className="text-xs py-0.5 px-2 rounded-full"
                            style={{ backgroundColor: metal.color + "40", color: metal.color }}
                          >
                            Tested
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Observations</h4>
                  <div className="space-y-2">
                    {testedMetals.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No observations yet. Test metals in the flame.</p>
                    ) : (
                      testedMetals.map((metalId) => {
                        const metal = metals.find(m => m.id === metalId);
                        if (!metal) return null;
                        
                        return (
                          <div key={metalId} className="text-sm flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2" 
                              style={{ backgroundColor: metal.color }}
                            ></div>
                            <span>{metal.name} produces a {metal.color.toLowerCase()} colored flame</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlameTest;

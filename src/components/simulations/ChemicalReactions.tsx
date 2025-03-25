
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, ChevronRight, RefreshCw, ClipboardCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ChemicalReactionsProps = {
  onComplete?: () => void;
};

const ChemicalReactions: React.FC<ChemicalReactionsProps> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState("reaction1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showBalanced, setShowBalanced] = useState(false);
  
  // Automatic animation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && animationStep < 5) {
      timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 1500);
    } else if (animationStep >= 5) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, animationStep]);
  
  // Reset animation when changing tabs
  useEffect(() => {
    setIsPlaying(false);
    setAnimationStep(0);
    setShowBalanced(false);
  }, [activeTab]);
  
  const handleStartAnimation = () => {
    setIsPlaying(true);
    setAnimationStep(0);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setAnimationStep(0);
  };
  
  const handleComplete = () => {
    setIsComplete(true);
    if (onComplete) onComplete();
    toast.success("Experiment completed successfully!");
  };
  
  // Reaction data
  const reactions = {
    reaction1: {
      name: "Single Displacement",
      unbalanced: "Zn + HCl → ZnCl₂ + H₂",
      balanced: "Zn + 2 HCl → ZnCl₂ + H₂",
      description: "Zinc metal reacts with hydrochloric acid to produce zinc chloride and hydrogen gas.",
      steps: [
        "Initially, zinc metal (Zn) and hydrochloric acid (HCl) are separate.",
        "Zinc begins to dissolve in the acid as it reacts.",
        "Zinc ions (Zn²⁺) enter the solution and combine with chloride ions (Cl⁻).",
        "Hydrogen gas (H₂) bubbles form and escape from the solution.",
        "The reaction completes, forming zinc chloride (ZnCl₂) solution."
      ],
      type: "single displacement",
      formulaType: "metal + acid → salt + hydrogen gas"
    },
    reaction2: {
      name: "Double Displacement",
      unbalanced: "AgNO₃ + NaCl → AgCl + NaNO₃",
      balanced: "AgNO₃ + NaCl → AgCl + NaNO₃",
      description: "Silver nitrate solution reacts with sodium chloride solution to form silver chloride precipitate and sodium nitrate solution.",
      steps: [
        "Initially, silver nitrate (AgNO₃) and sodium chloride (NaCl) are in separate solutions.",
        "When mixed, the solutions combine and ions exchange partners.",
        "Silver ions (Ag⁺) bond with chloride ions (Cl⁻) to form silver chloride (AgCl).",
        "The silver chloride has low solubility and forms a white precipitate.",
        "Sodium ions (Na⁺) and nitrate ions (NO₃⁻) remain in solution as sodium nitrate."
      ],
      type: "double displacement",
      formulaType: "AB + CD → AD + CB"
    },
    reaction3: {
      name: "Combustion",
      unbalanced: "CH₄ + O₂ → CO₂ + H₂O",
      balanced: "CH₄ + 2 O₂ → CO₂ + 2 H₂O",
      description: "Methane gas burns in oxygen to produce carbon dioxide and water vapor.",
      steps: [
        "Methane (CH₄) and oxygen (O₂) gases are initially separate.",
        "When ignited, the gases begin to react and release energy as heat and light.",
        "Carbon from the methane combines with oxygen to form carbon dioxide (CO₂).",
        "Hydrogen from the methane combines with oxygen to form water vapor (H₂O).",
        "The reaction completes with the formation of carbon dioxide and water vapor."
      ],
      type: "combustion",
      formulaType: "hydrocarbon + oxygen → carbon dioxide + water"
    }
  };
  
  const getActiveReaction = () => {
    return reactions[activeTab as keyof typeof reactions];
  };
  
  // Animation for molecules
  const renderMoleculeAnimation = () => {
    const reaction = getActiveReaction();
    
    return (
      <div className="h-[300px] border rounded-md bg-muted/20 relative overflow-hidden p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          {activeTab === "reaction1" && (
            <>
              {/* Zinc + HCl → ZnCl₂ + H₂ */}
              {animationStep === 0 && (
                <div className="flex space-x-12 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-3xl">
                      Zn
                    </div>
                    <p className="mt-2 text-sm">Zinc</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="text-center">
                    <div className="w-20 h-16 rounded-md bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-2xl">
                      2 HCl
                    </div>
                    <p className="mt-2 text-sm">Hydrochloric Acid</p>
                  </div>
                </div>
              )}
              
              {animationStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-32 h-24 rounded-md bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center relative">
                    <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl absolute left-4 top-1/2 transform -translate-y-1/2">
                      Zn
                    </div>
                    <div className="absolute right-4 text-xl">
                      HCl
                    </div>
                  </div>
                  <p className="mt-2 text-sm">Zinc in acid solution</p>
                </motion.div>
              )}
              
              {animationStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-32 h-24 rounded-md bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center relative">
                    <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60">
                      Zn
                    </div>
                    <div className="absolute right-4 top-2 text-xl">
                      Zn²⁺
                    </div>
                    <div className="absolute right-4 bottom-2 text-xl">
                      Cl⁻
                    </div>
                  </div>
                  <p className="mt-2 text-sm">Zinc dissolving, ions forming</p>
                </motion.div>
              )}
              
              {animationStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-32 h-24 rounded-md bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center relative">
                    <div className="w-10 h-10 rounded-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xl absolute left-4 top-1/2 transform -translate-y-1/2 opacity-30">
                      Zn
                    </div>
                    <div className="absolute right-4 top-2 text-xl">
                      ZnCl₂
                    </div>
                    {Array(3).fill(0).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-sm"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ 
                          y: [-20 * (i+1), -40 * (i+1)], 
                          opacity: [0, 1, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          delay: i * 0.3
                        }}
                        style={{ left: `${10 + i * 15}px`, bottom: '0px' }}
                      >
                        H₂↑
                      </motion.div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm">Hydrogen gas bubbling</p>
                </motion.div>
              )}
              
              {animationStep >= 4 && (
                <div className="flex space-x-12 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-cyan-200 dark:bg-cyan-800 flex items-center justify-center text-xl">
                      ZnCl₂
                    </div>
                    <p className="mt-2 text-sm">Zinc Chloride</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl">
                      H₂
                    </div>
                    <p className="mt-2 text-sm">Hydrogen Gas</p>
                  </div>
                </div>
              )}
            </>
          )}
          
          {activeTab === "reaction2" && (
            <>
              {/* AgNO₃ + NaCl → AgCl + NaNO₃ */}
              {animationStep === 0 && (
                <div className="flex space-x-12 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                      AgNO₃
                    </div>
                    <p className="mt-2 text-sm">Silver Nitrate</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xl">
                      NaCl
                    </div>
                    <p className="mt-2 text-sm">Sodium Chloride</p>
                  </div>
                </div>
              )}
              
              {animationStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-36 h-24 rounded-md bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center relative">
                    <div className="absolute left-4 top-4 text-base">Ag⁺</div>
                    <div className="absolute left-4 bottom-4 text-base">NO₃⁻</div>
                    <div className="absolute right-4 top-4 text-base">Na⁺</div>
                    <div className="absolute right-4 bottom-4 text-base">Cl⁻</div>
                    <div className="h-full w-[1px] bg-gray-400 dark:bg-gray-600 absolute left-1/2"></div>
                  </div>
                  <p className="mt-2 text-sm">Solutions mixing, ions separate</p>
                </motion.div>
              )}
              
              {animationStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-36 h-24 rounded-md bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center relative">
                    <motion.div 
                      className="absolute left-4 top-4 text-base"
                      animate={{ x: 28 }}
                      transition={{ duration: 1.5 }}
                    >
                      Ag⁺
                    </motion.div>
                    <motion.div
                      className="absolute left-4 bottom-4 text-base"
                      animate={{ x: 28 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    >
                      NO₃⁻
                    </motion.div>
                    <motion.div
                      className="absolute right-4 top-4 text-base"
                      animate={{ x: -28 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    >
                      Na⁺
                    </motion.div>
                    <motion.div
                      className="absolute right-4 bottom-4 text-base"
                      animate={{ x: -28 }}
                      transition={{ duration: 1.5 }}
                    >
                      Cl⁻
                    </motion.div>
                  </div>
                  <p className="mt-2 text-sm">Ions exchanging</p>
                </motion.div>
              )}
              
              {animationStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-36 h-24 rounded-md bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center relative">
                    <div className="absolute left-1/2 top-4 transform -translate-x-1/2 text-base">NaNO₃</div>
                    <motion.div
                      className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-12 h-6 bg-white dark:bg-gray-200 rounded-sm flex items-center justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      AgCl
                    </motion.div>
                  </div>
                  <p className="mt-2 text-sm">Silver chloride precipitating</p>
                </motion.div>
              )}
              
              {animationStep >= 4 && (
                <div className="flex flex-col space-y-4 items-center">
                  <div className="flex space-x-12 items-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-md bg-white dark:bg-gray-200 text-gray-800 flex items-center justify-center text-xl">
                        AgCl↓
                      </div>
                      <p className="mt-2 text-sm">Silver Chloride<br/>(precipitate)</p>
                    </div>
                    <div className="text-3xl">+</div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-md bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-xl">
                        NaNO₃
                      </div>
                      <p className="mt-2 text-sm">Sodium Nitrate<br/>(in solution)</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          {activeTab === "reaction3" && (
            <>
              {/* CH₄ + 2 O₂ → CO₂ + 2 H₂O */}
              {animationStep === 0 && (
                <div className="flex space-x-12 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      CH₄
                    </div>
                    <p className="mt-2 text-sm">Methane</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                      2 O₂
                    </div>
                    <p className="mt-2 text-sm">Oxygen</p>
                  </div>
                </div>
              )}
              
              {animationStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 dark:from-red-700 dark:to-yellow-600">
                    <div className="absolute text-lg text-white font-bold">CH₄ + 2 O₂</div>
                    <motion.div 
                      className="absolute w-full h-full rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(255,165,0,0.5) 0%, rgba(255,255,255,0) 70%)'
                      }}
                    />
                  </div>
                  <p className="mt-4 text-sm">Combustion begins with heat and light</p>
                </motion.div>
              )}
              
              {animationStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 dark:from-red-700 dark:to-yellow-600">
                    <div className="absolute text-sm text-white">
                      <div>C + O₂</div>
                      <div>H₄ + O₂</div>
                    </div>
                    <motion.div 
                      className="absolute w-full h-full rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(255,165,0,0.6) 0%, rgba(255,255,255,0) 70%)'
                      }}
                    />
                  </div>
                  <p className="mt-4 text-sm">Carbon and hydrogen begin to oxidize</p>
                </motion.div>
              )}
              
              {animationStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="relative w-36 h-36 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-400 dark:from-orange-700 dark:to-yellow-500">
                    <div className="absolute">
                      <motion.div
                        className="text-black dark:text-white text-sm font-bold"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        CO₂ forming
                      </motion.div>
                      <motion.div
                        className="text-black dark:text-white text-sm font-bold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        H₂O forming
                      </motion.div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">Products are forming</p>
                </motion.div>
              )}
              
              {animationStep >= 4 && (
                <div className="flex space-x-12 items-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl">
                      CO₂
                    </div>
                    <p className="mt-2 text-sm">Carbon Dioxide</p>
                  </div>
                  <div className="text-3xl">+</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xl">
                      2 H₂O
                    </div>
                    <p className="mt-2 text-sm">Water</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="reaction1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="reaction1">Single Displacement</TabsTrigger>
          <TabsTrigger value="reaction2">Double Displacement</TabsTrigger>
          <TabsTrigger value="reaction3">Combustion</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{getActiveReaction().name} Reaction</span>
                <Badge variant="outline">{getActiveReaction().type}</Badge>
              </CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">Type: {getActiveReaction().formulaType}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Chemical Equation</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 text-center bg-muted/20 p-3 rounded-md">
                    <span className="text-xl font-mono">{showBalanced ? getActiveReaction().balanced : getActiveReaction().unbalanced}</span>
                    <div className="mt-2 flex justify-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowBalanced(!showBalanced)}
                      >
                        {showBalanced ? "Show Unbalanced" : "Show Balanced"}
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div>
                <Label>Reaction Description</Label>
                <p className="mt-1 text-sm text-muted-foreground">{getActiveReaction().description}</p>
              </div>
              
              <Separator />
              
              <div>
                <Label>Animation</Label>
                {renderMoleculeAnimation()}
                
                <div className="mt-4 flex justify-between space-x-4">
                  <Button 
                    onClick={handleStartAnimation} 
                    disabled={isPlaying}
                    className="flex-1"
                  >
                    {animationStep > 0 && !isPlaying ? "Resume" : "Start"} Animation
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={animationStep === 0 || isPlaying}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Current Stage</Label>
                {animationStep < 5 ? (
                  <p className="text-sm mt-1">
                    {animationStep === 0 
                      ? "Initial reactants separated" 
                      : getActiveReaction().steps[animationStep - 1]}
                  </p>
                ) : (
                  <p className="text-sm mt-1 text-primary">Reaction complete!</p>
                )}
                
                <div className="h-1 bg-muted mt-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(animationStep / 5) * 100}%` }}
                  />
                </div>
              </div>
              
              {animationStep >= 5 && (
                <Alert className="bg-primary/20">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Reaction Complete</AlertTitle>
                  <AlertDescription>
                    <p>
                      This {getActiveReaction().name.toLowerCase()} reaction demonstrates the 
                      {activeTab === "reaction1" && " process where a metal displaces hydrogen from an acid."}
                      {activeTab === "reaction2" && " exchange of ions between two compounds forming a precipitate."}
                      {activeTab === "reaction3" && " complete oxidation of a hydrocarbon to form carbon dioxide and water."}
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setActiveTab(
                  activeTab === "reaction1" 
                    ? "reaction3" 
                    : activeTab === "reaction2" 
                      ? "reaction1" 
                      : "reaction2"
                )}
              >
                Switch Reaction
              </Button>
              
              <Button
                onClick={handleComplete}
                disabled={isComplete}
              >
                <ClipboardCheck className="mr-2 h-4 w-4" /> Mark as Complete
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <style>
        {`
          @keyframes bubble {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-20px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ChemicalReactions;

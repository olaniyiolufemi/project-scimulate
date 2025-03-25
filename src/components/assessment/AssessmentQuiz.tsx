
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Award, CheckCircle, ChevronRight, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
};

export type AssessmentData = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number;
};

type AssessmentQuizProps = {
  assessmentData: AssessmentData;
  onComplete: (score: number, passed: boolean) => void;
};

const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ assessmentData, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = assessmentData.questions[currentQuestionIndex];
  const totalQuestions = assessmentData.questions.length;
  
  const handleSelectAnswer = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate score before showing results
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    assessmentData.questions.forEach((question) => {
      const selectedAnswerId = selectedAnswers[question.id];
      if (selectedAnswerId) {
        const selectedOption = question.options.find(option => option.id === selectedAnswerId);
        if (selectedOption && selectedOption.isCorrect) {
          correctAnswers += 1;
        }
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    const passed = calculatedScore >= assessmentData.passingScore;
    
    setShowResult(true);
    
    // Notify the parent component
    onComplete(calculatedScore, passed);
    
    // Show toast notification
    if (passed) {
      toast.success("Congratulations! You passed the assessment.");
    } else {
      toast.error("You didn't meet the passing score. Review and try again.");
    }
  };

  const isAnswerCorrect = (questionId: string, optionId: string) => {
    const question = assessmentData.questions.find(q => q.id === questionId);
    if (!question) return false;
    
    const option = question.options.find(o => o.id === optionId);
    return option?.isCorrect || false;
  };

  const isCurrentQuestionAnswered = Boolean(selectedAnswers[currentQuestion.id]);
  const allQuestionsAnswered = assessmentData.questions.every(q => selectedAnswers[q.id]);
  
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Render the result screen
  if (showResult) {
    const passed = score >= assessmentData.passingScore;
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">{passed ? "Assessment Completed!" : "Assessment Review"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`rounded-full p-3 ${passed ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
              {passed ? (
                <Award className="h-12 w-12" />
              ) : (
                <AlertCircle className="h-12 w-12" />
              )}
            </div>
            
            <h3 className="text-xl font-semibold">Your Score: {score}%</h3>
            
            <div className="w-full max-w-md">
              <Progress value={score} className="h-3" />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span className="text-primary font-medium">{assessmentData.passingScore}% to pass</span>
                <span>100%</span>
              </div>
            </div>
            
            {passed ? (
              <Alert className="bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  You've successfully completed the assessment with a passing score.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertTitle>Review Needed</AlertTitle>
                <AlertDescription>
                  Your score didn't meet the passing requirement. Consider reviewing the experiment content and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Question Review</h3>
            
            {assessmentData.questions.map((question, index) => {
              const selectedOptionId = selectedAnswers[question.id];
              const isCorrect = selectedOptionId ? isAnswerCorrect(question.id, selectedOptionId) : false;
              
              return (
                <div key={question.id} className="space-y-3 rounded-lg border p-4">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    {selectedOptionId && (
                      <span className={isCorrect ? "text-green-600 dark:text-green-400 flex items-center" : "text-red-600 dark:text-red-400 flex items-center"}>
                        {isCorrect ? (
                          <><CheckCircle className="h-4 w-4 mr-1" /> Correct</>
                        ) : (
                          <><XCircle className="h-4 w-4 mr-1" /> Incorrect</>
                        )}
                      </span>
                    )}
                  </div>
                  
                  <p>{question.text}</p>
                  
                  <div className="pl-4 space-y-2">
                    {question.options.map((option) => {
                      const isSelected = selectedOptionId === option.id;
                      let optionClass = "pl-2";
                      
                      if (isSubmitted) {
                        if (option.isCorrect) {
                          optionClass += " text-green-600 dark:text-green-400 font-semibold";
                        } else if (isSelected && !option.isCorrect) {
                          optionClass += " text-red-600 dark:text-red-400 line-through";
                        }
                      } else if (isSelected) {
                        optionClass += " font-semibold";
                      }
                      
                      return (
                        <div key={option.id} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center 
                            ${isSelected ? 'bg-primary text-primary-foreground' : 'border border-muted-foreground'}`}>
                            {option.isCorrect && isSubmitted && <CheckCircle className="h-3 w-3" />}
                          </div>
                          <span className={optionClass}>{option.text}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {!isCorrect && (
                    <div className="mt-2 text-sm bg-muted/50 p-2 rounded-md">
                      <span className="font-medium">Explanation:</span> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => {
              setCurrentQuestionIndex(0);
              setSelectedAnswers({});
              setIsSubmitted(false);
              setShowResult(false);
              setScore(0);
            }}
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="text-sm font-medium">{progressPercentage}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
          
          <RadioGroup 
            value={selectedAnswers[currentQuestion.id] || ""}
            onValueChange={handleSelectAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer">{option.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={currentQuestionIndex === 0}
          variant="outline"
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={!isCurrentQuestionAnswered}
          onClick={handleNextQuestion}
          className="gap-1"
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentQuiz;

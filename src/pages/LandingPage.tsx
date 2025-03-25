
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, BookOpen, Users, ArrowRight } from "lucide-react";
import Flask from "@/components/icons/FlaskIcon";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Flask className="h-10 w-10 text-primary" />,
      title: "Virtual Experiments",
      description: "Conduct chemistry experiments in a safe, interactive virtual environment that simulates real laboratory conditions."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Curriculum Aligned",
      description: "All experiments align with WAEC, NECO, and JAMB syllabi, ensuring relevant educational content for Nigerian students."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Teacher Dashboard",
      description: "Teachers can monitor student progress, assign experiments, and provide feedback through a comprehensive dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 z-0"
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            opacity: 0.7
          }}
        />
        <div 
          ref={heroRef} 
          className="container mx-auto px-6 z-10 text-center" 
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="stagger-load"
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Making Science Accessible for All
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Scimulate</span>
              <span className="block mt-2">Virtual Science Laboratory</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              An innovative platform providing Nigerian secondary school students with access to interactive science experiments, bridging the gap in laboratory resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/login")}
                size="lg" 
                className="px-8 py-6 text-lg font-medium hover-lift"
              >
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => {
                  const featuresSection = document.getElementById("features");
                  featuresSection?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg font-medium hover-lift"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements animation */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" style={{ animationDelay: "0s" }}></div>
        <div className="absolute bottom-1/3 right-20 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Scimulate?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform bridges the gap in laboratory resources, making science education accessible to all Nigerian students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card dark:glass-card-dark p-8 rounded-xl hover-lift"
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Science Education?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of Nigerian students and teachers already using Scimulate to enhance their educational experience.
            </p>
            <Button 
              onClick={() => navigate("/login")}
              size="lg" 
              className="px-8 py-6 text-lg font-medium hover-lift"
            >
              Start Experimenting Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-gradient">Scimulate</div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Virtual Science Laboratory</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Contact</Link>
              <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Scimulate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

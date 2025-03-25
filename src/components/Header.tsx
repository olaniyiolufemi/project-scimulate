
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Home, Book, Settings, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface HeaderProps {
  userType: "student" | "teacher";
}

const Header = ({ userType }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = userType === "student" 
    ? [
        { label: "Dashboard", href: "/student", icon: <Home className="h-4 w-4 mr-2" /> },
        { label: "Experiments", href: "/student#experiments", icon: <Book className="h-4 w-4 mr-2" /> },
      ]
    : [
        { label: "Dashboard", href: "/teacher", icon: <Home className="h-4 w-4 mr-2" /> },
        { label: "Assignments", href: "/teacher#assignments", icon: <Book className="h-4 w-4 mr-2" /> },
      ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient mr-1">Scimulate</span>
              <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {userType === "student" ? "Student" : "Teacher"}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton />
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <UserButton />
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center px-2 py-1.5 text-sm font-medium rounded-md hover:bg-primary/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                
                <Link
                  to="/settings"
                  className="flex items-center px-2 py-1.5 text-sm font-medium rounded-md hover:bg-primary/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-2 py-1.5 text-sm font-medium rounded-md hover:bg-primary/10 w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

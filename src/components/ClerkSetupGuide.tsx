
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink, Info } from "lucide-react";

const ClerkSetupGuide: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-3xl w-full border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Clerk Authentication Setup Required</CardTitle>
          </div>
          <CardDescription>
            The application requires a valid Clerk publishable key to function properly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              How to get your Clerk publishable key:
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Sign up or log in to <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Clerk.com</a></li>
              <li>Create a new application or select an existing one</li>
              <li>Navigate to the API Keys section in your dashboard</li>
              <li>Copy your <strong>Publishable Key</strong> that starts with <code className="bg-background px-1 py-0.5 rounded">pk_</code></li>
              <li>Create a <code className="bg-background px-1 py-0.5 rounded">.env</code> file in your project root (if it doesn't exist)</li>
              <li>Add the following line: <code className="bg-background px-1 py-0.5 rounded">VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>
          
          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/30">
            <p className="text-sm">
              <strong>Note:</strong> You are seeing this screen because the application could not find a valid Clerk publishable key.
              This key is required for authentication to work properly. Without it, users won't be able to sign in or access protected routes.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 items-center justify-between">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => window.open("https://dashboard.clerk.com/last-active?path=api-keys", "_blank")}
          >
            Go to Clerk Dashboard <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClerkSetupGuide;

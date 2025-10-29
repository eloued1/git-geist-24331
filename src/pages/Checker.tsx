import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultCard from "@/components/ResultCard";

const Checker = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      toast.error("Please enter a GitHub repository URL");
      return;
    }

    // Basic URL validation
    if (!repoUrl.includes("github.com")) {
      toast.error("Please enter a valid GitHub repository URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - replace with actual API integration
    setTimeout(() => {
      const mockResults = [
        {
          repoUrl: "https://github.com/example/similar-project",
          similarity: 87,
          stars: 1250,
          forks: 320,
          keywords: ["React", "TypeScript", "API", "Authentication"],
          description: "A comprehensive project management tool with real-time collaboration features"
        },
        {
          repoUrl: "https://github.com/demo/code-analyzer",
          similarity: 76,
          stars: 890,
          forks: 145,
          keywords: ["JavaScript", "Analysis", "Code Quality"],
          description: "Static code analysis tool for JavaScript projects with extensive reporting"
        },
        {
          repoUrl: "https://github.com/test/repo-checker",
          similarity: 65,
          stars: 543,
          forks: 87,
          keywords: ["Python", "GitHub", "API", "Automation"],
          description: "Automated repository health checker with CI/CD integration capabilities"
        },
        {
          repoUrl: "https://github.com/sample/dev-tools",
          similarity: 52,
          stars: 312,
          forks: 64,
          keywords: ["DevOps", "Tools", "Monitoring"],
          description: "Collection of development tools and utilities for modern software teams"
        },
      ];
      
      setResults(mockResults);
      setIsLoading(false);
      toast.success("Analysis complete! Found potential matches.");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/95">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Repository Plagiarism Checker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter a GitHub repository URL to analyze for potential code similarities and duplicates
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-12 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border shadow-lg">
              <Input
                type="text"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 h-12 bg-background/50 border-border focus:border-primary transition-colors"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Check Repository
                  </>
                )}
              </Button>
            </div>
          </form>

          {isLoading && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block p-4 rounded-full bg-primary/10 animate-glow mb-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
              <p className="text-muted-foreground">Scanning repositories and analyzing code patterns...</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Analysis Results
                </h2>
                <p className="text-sm text-muted-foreground">
                  Found {results.length} potential matches
                </p>
              </div>
              
              <div className="grid gap-6">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ResultCard {...result} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && results.length === 0 && repoUrl && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-block p-4 rounded-full bg-secondary/50 mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No results yet. Enter a repository URL and click "Check Repository"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checker;

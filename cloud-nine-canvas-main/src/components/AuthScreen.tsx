import { useState } from "react";
import KreoLogo from "./KreoLogo";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Check your email for confirmation!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "GitHub login failed");
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-6xl font-serif italic text-foreground tracking-tighter" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>Kreo</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 mt-2">Why think when you can visualise</p>
        </div>

        <div className="glass-panel rounded-2xl p-8 border-foreground/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <button
            onClick={handleGitHub}
            className="mt-3 w-full rounded-lg border border-foreground/15 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground/30 flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Continue with GitHub
          </button>

          <p className="mt-6 text-center text-xs text-foreground/50">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-foreground/80 underline underline-offset-2 transition-colors duration-200 hover:text-foreground"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

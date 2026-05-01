import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/mentra/AuthLayout";
import { AuthField } from "@/components/mentra/AuthField";

const Signup = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav("/");
    }, 800);
  };

  return (
    <AuthLayout
      eyebrow="Begin with intention"
      title={<>Start <span className="font-serif-i">thinking softly.</span></>}
      subtitle="A quiet space for the choices that matter."
      footer={
        <>Already have an account? <Link to="/login" className="underline-offset-4 hover:underline" style={{ color: "var(--m-text)" }}>Sign in</Link></>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <AuthField id="name" type="text" label="Your name" placeholder="What should we call you?" required autoComplete="name" />
        <AuthField id="email" type="email" label="Email" placeholder="you@quiet.studio" required autoComplete="email" />
        <AuthField id="password" type="password" label="Password" placeholder="At least 8 characters" required minLength={8} autoComplete="new-password" />

        <p className="text-[12px] leading-relaxed" style={{ color: "var(--m-text-3)" }}>
          By continuing, you accept our quiet promise: your decisions stay yours.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="glass-input mt-2 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] font-medium transition-all hover:-translate-y-0.5"
          style={{
            color: "var(--m-text)",
            background: "linear-gradient(120deg, rgba(201,193,240,0.55), rgba(240,196,200,0.5), rgba(184,212,192,0.5))",
            backgroundSize: "200% 200%",
            animation: "shimmerSweep 7s ease-in-out infinite",
          }}
        >
          {loading ? "Preparing your space…" : "Create account"}
          <ArrowRight size={16} strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-3 py-2">
          <div className="h-px flex-1" style={{ background: "rgba(180,158,130,0.25)" }} />
          <span className="label-tag">or</span>
          <div className="h-px flex-1" style={{ background: "rgba(180,158,130,0.25)" }} />
        </div>

        <button type="button" className="btn-ghost-m w-full">Continue with Google</button>
      </form>
    </AuthLayout>
  );
};

export default Signup;

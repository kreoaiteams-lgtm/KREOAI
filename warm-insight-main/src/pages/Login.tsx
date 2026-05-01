import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/mentra/AuthLayout";
import { AuthField } from "@/components/mentra/AuthField";

const Login = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nav("/");
    }, 700);
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={<>Step <span className="font-serif-i">back in.</span></>}
      subtitle="Pick up your thinking where you left it."
      footer={
        <>New here? <Link to="/signup" className="underline-offset-4 hover:underline" style={{ color: "var(--m-text)" }}>Create an account</Link></>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <AuthField id="email" type="email" label="Email" placeholder="you@quiet.studio" required autoComplete="email" />
        <AuthField id="password" type="password" label="Password" placeholder="••••••••" required autoComplete="current-password" />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-[13px]" style={{ color: "var(--m-text-2)" }}>
            <input type="checkbox" className="h-3.5 w-3.5 rounded" />
            Remember me
          </label>
          <Link to="#" className="text-[13px] underline-offset-4 hover:underline" style={{ color: "var(--m-text-2)" }}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="glass-input group mt-2 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] font-medium transition-all hover:-translate-y-0.5"
          style={{
            color: "var(--m-text)",
            background: "linear-gradient(120deg, rgba(242,196,160,0.45), rgba(201,193,240,0.55), rgba(240,196,200,0.45))",
            backgroundSize: "200% 200%",
            animation: "shimmerSweep 7s ease-in-out infinite",
          }}
        >
          {loading ? "Opening…" : "Continue"}
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

export default Login;

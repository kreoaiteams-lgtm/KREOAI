import { InputHTMLAttributes, forwardRef } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AuthField = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <label htmlFor={id} className="block">
        <span className="label-tag mb-2 block">{label}</span>
        <input
          ref={ref}
          id={id}
          {...props}
          className="glass-input w-full rounded-2xl px-5 py-4 text-[16px] outline-none placeholder:text-[color:var(--m-text-3)]"
          style={{
            color: "var(--m-text)",
            transition: "all 0.3s var(--ease-out-soft)",
            fontFamily: "'Satoshi', sans-serif",
          }}
        />
      </label>
    );
  }
);
AuthField.displayName = "AuthField";

import { InputHTMLAttributes, forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = "", ...props }, ref) => {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`h-4 w-4 rounded border-neutral-300 text-amber-700 focus:ring-amber-700 ${className}`}
          {...props}
        />
        {label}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
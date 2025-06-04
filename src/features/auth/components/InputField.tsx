import React from "react";

type InputFieldProps = {
  placeholder: string;
  type?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ placeholder, type = "text", error, ...rest }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border rounded-sm p-3 w-full ${
          error ? "border-red-500" : "border-[#cccccc]"
        }`}
        {...rest}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
);

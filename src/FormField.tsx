import { PropsWithChildren } from "react";

type FormFieldProps = {
  htmlFor?: string;
  label: string;
  error?: string;
};

export default function FormField({
  htmlFor,
  label,
  children,
  error,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="form-field" data-haserror={!!error}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      <p className="error-message">{error || " "}</p>
    </div>
  );
}

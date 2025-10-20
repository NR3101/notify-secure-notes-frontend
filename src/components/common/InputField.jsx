import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Reusable Input Field component with validation
const InputField = ({
  label,
  required,
  id,
  type,
  message,
  placeholder,
  register,
  errors,
  min,
  className,
}) => {
  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className={className}
        {...register(id, {
          required: required ? message : false,
          minLength: min
            ? {
                value: min,
                message: `Minimum ${min} characters required`,
              }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: emailPattern,
                  message: "Please enter a valid email address",
                }
              : undefined,
        })}
      />
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">{errors[id].message}</p>
      )}
    </div>
  );
};

export default InputField;

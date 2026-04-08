interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name: string;
  fullWidth?: boolean;
  placeholder: string;
  type: string;
  noLabel?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  label,
  name,
  fullWidth = false,
  type,
  placeholder,
  noLabel = false,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={`${fullWidth ? "w-full" : "min-w-3xs"}`}>
      <label htmlFor={id} className="">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="
          p-2.5
          mt-2.5

          border-transparent
          rounded-xl

          min-w-fit
        "
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

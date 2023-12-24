import { ChangeEvent, forwardRef, HTMLAttributes } from "react";

interface TextInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput"> {
  onInput?: (value: string) => void;
  label: string;
  flat?: boolean;
  errorText?: string;
  type?: "text" | "password" | "email";
}

type Ref = HTMLInputElement;

export const TextInput = forwardRef<Ref, TextInputProps>(
  (props: TextInputProps, ref) => {
    const {
      label,
      onInput,
      flat,
      type = "text",
      errorText,
      ...inputProps
    } = props;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      onInput?.(value);
    };

    const outline = errorText
      ? "border-2 border-red-500"
      : flat
        ? ""
        : "border-2";

    return (
      <label
        role="button"
        className="text-xl font-semibold flex flex-col gap-1"
      >
        {label}
        <input
          {...inputProps}
          className={`p-1 rounded-lg outline-black ${outline}`}
          type={type}
          name={inputProps.id}
          ref={ref}
          onChange={onChange}
        />
        <span className={`text-red-500 ${errorText ? "visible" : "invisible"}`}>
          {errorText}
        </span>
      </label>
    );
  }
);

import { ChangeEvent, HTMLAttributes } from "react";

interface TextAreaInputProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, "onInput"> {
  onInput?: (value: string) => void;
  label: string;
}

export const TextAreaInput = (props: TextAreaInputProps) => {
  const { label, onInput, className, ...areaProps } = props;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onInput?.(value);
  };

  return (
    <div className="flex flex-row justify-between">
      <label
        role="button"
        className="text-xl font-semibold flex flex-col gap-3 w-full"
      >
        {label}
        <textarea
          className={`border-2 rounded-lg max-h-48 w-full p-2 ${className}`}
          onChange={onChange}
          {...areaProps}
        />
      </label>
    </div>
  );
};

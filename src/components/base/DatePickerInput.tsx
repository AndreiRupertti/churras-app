import { ChangeEvent, HTMLAttributes } from "react";

interface DatePickerInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput"> {
  onInput?: (value: string) => void;
  label: string;
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const { label, onInput, ...inputProps } = props;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInput?.(value);
  };

  return (
    <div className="flex flex-row justify-between">
      <label
        role="button"
        className="text-xl font-semibold flex flex-col gap-1"
      >
        {label}
        <input
          {...inputProps}
          className="border-2 rounded-lg p-1"
          type="date"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

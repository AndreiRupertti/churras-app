import { ChangeEvent, forwardRef, HTMLAttributes } from "react";

interface TextInputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput"> {
  onInput?: (value: string) => void;
  label: string;
}

type Ref = HTMLInputElement;

export const TextInput = forwardRef<Ref, TextInputProps>(
  (props: TextInputProps, ref) => {
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
            className="p-1 border-2 rounded-lg"
            type="text"
            name={inputProps.id}
            ref={ref}
            onChange={onChange}
          />
        </label>
      </div>
    );
  }
);

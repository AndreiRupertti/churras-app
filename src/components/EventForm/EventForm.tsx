import { Button } from "@components/base/Button";
import { MoneyInput } from "@components/base/MoneyInput";
import { PriceOptionsInput } from "@components/base/PriceOptionsInput";
import { TextAreaInput } from "@components/base/TextAreaInput";
import { TextInput } from "@components/base/TextInput";
import { DatePickerInput } from "@componentsbase/DatePickerInput";
import { FormEvent, FunctionComponent, useState } from "react";

interface EventFormProps {
  onCancel: () => void;
  onSubmit: (info: {
    name: string;
    date: string;
    description: string;
    priceOptions: number[];
    totalPrice: number;
  }) => void;
}

export const EventForm: FunctionComponent<EventFormProps> = (props) => {
  const [priceOptions, setPriceOptions] = useState<number[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const [nameInput, priceInput, dateInput, _priceOptInput, descriptionInput] =
      e.target;

    const submitInfo = {
      name: nameInput.value,
      totalPrice: Number(priceInput.value),
      date: dateInput.value,
      description: descriptionInput.value,
      priceOptions,
    };

    props.onSubmit(submitInfo);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 md:w-10/12">
          <TextInput id="name" label="Nome do Evento:" />
          <DatePickerInput id="date" label="Data do Evento:" />
          <MoneyInput id="totalPrice" label="Valor Total:" currency="R$" />
          <PriceOptionsInput
            id="priceOptions"
            label="Opções de preço:"
            maxOpts="10"
            onInput={(opts) => setPriceOptions(opts)}
          />
          <TextAreaInput
            id="description"
            label="Descrição:"
            className="w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-end md:justify-end gap-3 h-40 md:h-auto p-5 pt-14">
          <Button
            decoration="secondary"
            label="Cancelar"
            type="button"
            className="w-full md:w-52"
            onClick={() => props.onCancel()}
          />
          <Button
            decoration="primary"
            type="submit"
            label="Salvar"
            className="w-full md:w-52"
          />
        </div>
      </div>
    </form>
  );
};

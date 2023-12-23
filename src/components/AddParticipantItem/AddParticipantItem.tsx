import { formatMoney } from "@utils/formatMoney";
import { Button } from "@components/base/Button";
import {
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { ParticipantInput, Event } from "types/event";

interface AddParticipantItemProps extends HTMLAttributes<HTMLInputElement> {
  event: Event;
  onAdd?: (participant: ParticipantInput) => void;
}

export const AddParticipantItem = ({
  event,
  onAdd,
}: AddParticipantItemProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setShowAddForm(false);
  }, [event.id]);

  const onSave = () => {
    if (inputRef.current) {
      const participantInput = {
        name: inputRef.current?.value ?? "",
        amountToPay: Number(priceRef.current?.value) ?? 0,
        eventId: event.id,
      };
      onAdd?.(participantInput);
      inputRef.current.value = "";
    }
  };

  const showForm = () => {
    setShowAddForm(true);
  };

  useEffect(() => {
    if (showAddForm) {
      inputRef.current?.focus();
    }
  }, [showAddForm]);

  const onEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    }
  };
  return (
    <div className="h-12 p-y-5" onKeyDown={onEnterPress}>
      <Button
        label="Novo Participante"
        decoration="text"
        onClick={showForm}
        className={`${showAddForm ? "hidden" : "visible"}`}
      >
        <span className="text-2xl">+</span>
      </Button>
      <div
        className={`flex flex-row justify-between ${
          showAddForm ? "visible" : "hidden"
        }`}
      >
        <label className="text-xl font-semibold flex flex-row w-full p-3 ">
          <input
            ref={inputRef}
            className="appearance-none w-full focus:outline-none"
            type="text"
            placeholder="Novo participante..."
          />
          <select
            ref={priceRef}
            name="priceOptions"
            id="priceOpts"
            className="w-32"
            required
          >
            {event.priceOptions.map((price, index) => (
              <option key={`${index}-${price}`} value={price}>
                {formatMoney(price, "BRL")}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

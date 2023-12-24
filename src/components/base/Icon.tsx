import BBQIcon from "public/bbq.svg";
import DollarSignIcon from "public/dollar-sign.svg";
import PeopleIcon from "public/people.svg";
import CloseIcon from "public/close.svg";
import DeleteIcon from "public/delete.svg";
import { HTMLAttributes } from "react";

const icons = {
  people: PeopleIcon,
  dollarSign: DollarSignIcon,
  bbq: BBQIcon,
  close: CloseIcon,
  delete: DeleteIcon,
};

type Size = number;

export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons;
  size: Size | [Size, Size];
  color?: "black" | "white" | "primary";
}

export const Icon = ({ size, name, color, ...svgProps }: IconProps) => {
  const IconComponent = icons[name];
  const defaultSize = 16;
  const [width, height] = Array.isArray(size)
    ? size
    : [size ?? defaultSize, size ?? defaultSize];

  const colors = {
    black: "#000000",
    white: "#FFFFFF",
    primary: "#FFD836",
  };

  return (
    <IconComponent
      {...svgProps}
      style={{ width, height }}
      fill={colors[color ?? "primary"]}
    />
  );
};

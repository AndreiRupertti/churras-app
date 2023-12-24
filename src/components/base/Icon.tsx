import dynamic from "next/dynamic";
import { ComponentType, FC, HTMLAttributes } from "react";
const BBQIcon = dynamic(() => import("public/bbq.svg"));
const DollarSignIcon = dynamic(() => import("public/dollar-sign.svg"));
const PeopleIcon = dynamic(() => import("public/people.svg"));
const CloseIcon = dynamic(() => import("public/close.svg"));
const DeleteIcon = dynamic(() => import("public/delete.svg"));

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
  const IconComponent = icons[name] as ComponentType<SVGImageElement>;
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
      fill={colors[color ?? "primary"]}
      //@ts-ignore
      style={{ width, height }}
    />
  );
};

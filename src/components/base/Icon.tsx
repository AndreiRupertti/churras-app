import BBQIcon from "public/bbq.svg";
import DollarSignIcon from "public/dollar-sign.svg";
import PeopleIcon from "public/people.svg";
import CloseIcon from "public/close.svg";
import { HTMLAttributes } from "react";

const icons = {
  people: PeopleIcon,
  dollarSign: DollarSignIcon,
  bqq: BBQIcon,
  close: CloseIcon,
};

type Size = 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32 | 40 | 50 | 60;
export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons;
  size: Size | [Size, Size];
}

export const Icon = ({ size, name, ...svgProps }: IconProps) => {
  const IconComponent = icons[name];
  const defaultSize = 16;
  const [width, height] = Array.isArray(size)
    ? size
    : [size ?? defaultSize, size ?? defaultSize];

  return (
    <IconComponent {...svgProps} style={{ width, height }} fill="#FFD836" />
  );
};

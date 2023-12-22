import { Icon, IconProps } from "./Icon";
import { DefaultTheme } from "tailwindcss/types/generated/default-theme";

interface TextIconProps extends Omit<IconProps, "name"> {
  text: string | number;
  iconName: IconProps["name"];
  fontSize?: keyof DefaultTheme["fontSize"];
}

export const TextIcon = (props: TextIconProps) => {
  const { text, iconName, fontSize = "xl", ...iconProps } = props;

  return (
    <div className={`flex flex-row gap-1 text-${fontSize}`}>
      <Icon name={iconName} {...iconProps} />
      {text}
    </div>
  );
};

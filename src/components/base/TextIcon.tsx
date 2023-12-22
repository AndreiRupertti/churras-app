import { Icon, IconProps } from "./Icon";

interface TextIconProps extends Omit<IconProps, "name"> {
  text: string | number;
  iconName: IconProps["name"];
}

export const TextIcon = (props: TextIconProps) => {
  const { text, iconName, ...iconProps } = props;

  return (
    <div className="flex flex-row gap-1 text-xl">
      <Icon name={iconName} {...iconProps} className="block m-auto" />
      {text}
    </div>
  );
};

interface BadgeProps {
  label: string;
  color: "red" | "yellow" | "gray" | "green";
  position: "top-right";
}

export const Badge = ({ label, color, position }: BadgeProps) => {
  const colorClass = {
    green: "bg-green-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
    yellow: "bg-yellow-500",
  }[color];

  const positionClass = {
    "top-right": "top-3 end-3",
  }[position];

  return (
    <span
      className={`absolute  ${positionClass} pt-1 pb-1 pl-4 pr-4 rounded-full ${colorClass}`}
    >
      {label}
    </span>
  );
};

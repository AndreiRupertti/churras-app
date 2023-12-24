import bg from "public/bbq-pattern.png";
import { FC, PropsWithChildren } from "react";

interface Header extends PropsWithChildren {
  text: string;
}

export const Header: FC<Header> = (props) => {
  return (
    <div
      className="flex flex-col gap-7 h-64 justify-center items-center bg-yellow-300"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold">{props.text}</h1>
      {props.children}
    </div>
  );
};

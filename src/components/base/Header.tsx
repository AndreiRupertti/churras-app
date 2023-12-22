import bg from "public/bbq-pattern.png";

interface Header {
  text: string;
}

export const Header = (props: Header) => {
  return (
    <div
      className="flex h-64 justify-center items-center bg-yellow-300"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-extrabold">{props.text}</h1>
    </div>
  );
};

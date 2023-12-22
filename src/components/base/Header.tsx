interface Header {
  text: string;
}

export const Header = (props: Header) => {
  return (
    <div className="flex h-52 md:h-64 justify-center items-center bg-red-500">
      <h1 className="text-4xl md:text-5xl font-extrabold">{props.text}</h1>
    </div>
  );
};

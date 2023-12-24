import { randomUUID } from "crypto";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const events = [
  {
    id: randomUUID(),
    name: "Jogo do Grêmio",
    description,
    date: "2024-05-07T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Niver Gui",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Navegantes",
    description,
    date: "2024-02-11T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Páscoa",
    description,
    date: "2024-04-14T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Natal",
    description,
    date: "2023-12-25T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Churras de Terça",
    description,
    date: "2023-09-21T14:40:35.979Z",
    totalPrice: 280.0,
  },
  {
    id: randomUUID(),
    name: "Um animado evento de churrasco, sob o céu ensolarado, reuniu amigos e familiares em uma atmosfera descontraída. A churrasqueira crepitava com deliciosos aromas de carne grelhada, enquanto risadas ecoavam ao redor.",
    description,
    date: "2023-09-21T14:40:35.979Z",
    totalPrice: 280.0,
  },
];

import { Footer } from "@components/base/Footer";
import { Header } from "@components/base/Header";
import "@globals/globals.css";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { Pages } from "@enums/pages";

export default async function NotFound() {
  return (
    <div className="flex flex-col h-screen bg-yellow-300">
      <Header text="Página não encontrada">
        <Link href={Pages.HOME} className="text-blue-700 font-bold underline">
          Procurando a Home Page?
        </Link>
      </Header>
      <Footer />
    </div>
  );
}

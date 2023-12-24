import { Footer } from "@components/base/Footer";
import { Header } from "@components/base/Header";
import { LoginForm } from "@components/LoginForm/LoginForm";
import "@globals/globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "tailwindcss/tailwind.css";

export default async function Login() {
  if (cookies().has("accessToken")) {
    redirect("/");
  }
  return (
    <div className="font-base flex flex-col bg-yellow-300 min-h-screen">
      <Header text="Agenda de Churras" />
      <div className="flex flex-col justify-center items-center pt-10">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}

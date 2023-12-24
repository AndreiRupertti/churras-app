import { Footer } from "@components/base/Footer";
import { Header } from "@components/base/Header";
import { LoginForm } from "@components/LoginForm/LoginForm";
import "@globals/globals.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "tailwindcss/tailwind.css";
import { Pages } from "@enums/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  icons: {
    icon: "/bbq.svg",
  },
};

export default async function Login() {
  if (cookies().has("accessToken")) {
    redirect(Pages.HOME);
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

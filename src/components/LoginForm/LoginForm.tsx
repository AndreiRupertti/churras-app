"use client";

import { Button } from "@components/base/Button";
import { TextInput } from "@components/base/TextInput";
import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import * as actions from "@app/actions";

interface LoginFormProps {}

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [allowLogin, setAllowLogin] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    password: "",
    email: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    const submitInfo = {
      email: emailRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    };

    actions.login(submitInfo).catch(() => {
      setSubmitError("Email ou senha inválidos");
    });
  };

  const validateEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const EMAIL_RGX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const email = event.target.value;

    if (!email || !EMAIL_RGX.test(email)) {
      setFormErrors({ ...formErrors, email: "Email inválido" });
    } else {
      setFormErrors({ ...formErrors, email: "" });
    }
  };

  const validatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    if (!password) {
      setFormErrors({ ...formErrors, password: "Senha inválida" });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  useEffect(() => {
    const invalidForm = Object.values(formErrors).some((value) => !!value);
    if (invalidForm) {
      setAllowLogin(false);
    } else {
      setAllowLogin(true);
    }
  }, [JSON.stringify(formErrors)]);

  return (
    <div className="flex flex-col justify-between h-full w-full md:w-1/3 md:max-w-md px-14 ">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-10">
          <TextInput
            ref={emailRef}
            id="email"
            type="email"
            label="Email:"
            onBlur={validateEmail}
            errorText={formErrors.email}
            flat
          />
          <TextInput
            ref={passwordRef}
            id="password"
            label="Senha:"
            onBlur={validatePassword}
            errorText={formErrors.password}
            type="password"
            flat
          />

          <Button
            decoration="primary"
            type="submit"
            label="Entrar"
            className="w-full"
            disabled={!allowLogin}
          />
          {submitError && (
            <span className="text-red-500 text-center">{submitError}</span>
          )}
        </div>
      </form>
    </div>
  );
};

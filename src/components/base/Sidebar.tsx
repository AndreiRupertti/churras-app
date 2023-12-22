"use client";

import { useEffect, useRef } from "react";
import { FC } from "react";
import { PropsWithChildren, useState } from "react";
import { Icon } from "./Icon";
import Logo from "public/logo.svg";
import bg from "public/bbq-pattern.png";

interface SidebarProps {
  onOpen?: () => void;
  onClose?: () => void;
  open: boolean;
}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
  onOpen,
  onClose,
  open,
  children,
}) => {
  const lockBody = () => {
    document.body.classList.add("overflow-hidden");
  };
  const releaseBody = () => {
    document.body.classList.remove("overflow-hidden");
  };

  const onCloseEvent = () => {
    releaseBody();
    onClose?.();
  };

  useEffect(() => {
    if (open) {
      lockBody();
      if (onOpen) onOpen();
    }
  }, [open]);

  const width = open ? "w-full md:w-2/5" : "w-0";
  const opacity = open ? "opacity-100" : "opacity-0";
  const overlayVisibility = open ? "hidden md:block" : "hidden";
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-700 opacity-70 ${overlayVisibility}`}
        onClick={onCloseEvent}
      />
      <div
        className={`h-full fixed top-0 right-0 ${width} ${opacity} bg-white shadow-2xl overflow-y-scroll`}
        style={{ transition: "width 0.5s, opacity 0.3s" }}
      >
        <div
          className="h-52 w-full bg-yellow-300"
          style={{
            backgroundImage: `url(${bg.src})`,
          }}
        >
          <div className="fixed md:relative w-full h-18 bg-yellow-300 md:bg-transparent">
            <Icon
              role="button"
              name="close"
              className="left-0"
              size={60}
              onClick={onCloseEvent}
            />
          </div>
        </div>
        <div className="mt-14">{children}</div>
        <div className="flex justify-center items-end p-10">
          <Logo />
        </div>
      </div>
    </>
  );
};

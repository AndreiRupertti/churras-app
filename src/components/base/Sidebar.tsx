"use client";

import { useEffect } from "react";
import { FC } from "react";
import { PropsWithChildren, useState } from "react";
import { Icon } from "./Icon";

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
  useEffect(() => {
    if (open) {
      if (onOpen) onOpen();
    }
  }, [open]);

  const width = open ? "w-full md:w-2/5" : "w-0";
  const opacity = open ? "opacity-100" : "opacity-0";

  return (
    <div
      className={`h-full fixed top-0 right-0 ${width} ${opacity} bg-purple-500`}
      style={{ transition: "width 0.5s, opacity 0.3s" }}
    >
      <div className="fixed h-3/12 w-full bg-blue-500">
        <Icon
          role="button"
          name="close"
          className="left-0"
          size={60}
          onClick={() => onClose?.()}
        />
      </div>
      {children}
    </div>
  );
};

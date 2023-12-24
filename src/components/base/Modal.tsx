"use client";

import { useEffect } from "react";
import { FC } from "react";
import { PropsWithChildren } from "react";
import { Icon } from "./Icon";

interface ModalProps {
  onOpen?: () => void;
  onClose?: () => void;
  open: boolean;
  title?: string;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  onOpen,
  onClose,
  open,
  title,
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
    } else {
      releaseBody();
      if (onClose) onClose();
    }
  }, [open]);

  const overlayVisibility = open ? "hidden md:block" : "hidden";

  if (!open) return null;

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-gray-700 opacity-70  ${overlayVisibility}`}
        onClick={onCloseEvent}
      />
      <div className={`absolute flex top-0 left-0 w-full h-full`}>
        <div
          className={`fixed top-1/2 left-1/2 w-full h-full md:h-auto -translate-x-1/2 -translate-y-1/2 md:w-2/4 max-w-4xl shadow-2xl bg-white md:rounded-lg`}
        >
          <div className="flex flex-row text-center">
            <Icon role="button" name="close" size={60} onClick={onCloseEvent} />
            {title && (
              <h3 className="absolute font-bold left-1/2 top-2 -translate-x-1/2 text-2xl">
                {title}
              </h3>
            )}
          </div>
          <div className="min-h-40 p-4 lg:p-8">{children}</div>
        </div>
      </div>
    </>
  );
};

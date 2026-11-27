"use client";

import { useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { Drawer } from "vaul";

type EditDialogProps = {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
};

function subscribeMobile(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function readIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function EditDialog({ title, closeLabel, onClose, children }: EditDialogProps) {
  const isMobile = useSyncExternalStore(subscribeMobile, readIsMobile, () => false);

  if (isMobile) {
    return (
      <Drawer.Root open onOpenChange={(next) => !next && onClose()}>
        <Drawer.Portal>
          <Drawer.Overlay className="edit-drawer-overlay" />
          <Drawer.Content className="edit-drawer-content">
            <div className="edit-drawer-handle" aria-hidden="true" />
            <div className="edit-dialog-head">
              <Drawer.Title asChild>
                <h2>{title}</h2>
              </Drawer.Title>
              <button type="button" className="header-login" onClick={onClose}>
                {closeLabel}
              </button>
            </div>
            <div className="edit-drawer-body">{children}</div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <DesktopEditDialog title={title} closeLabel={closeLabel} onClose={onClose}>
      {children}
    </DesktopEditDialog>
  );
}

function DesktopEditDialog({ title, closeLabel, onClose, children }: EditDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusable = () =>
      [...dialog.querySelectorAll<HTMLElement>("button, [href], input, select, textarea")].filter(
        (node) => !node.hasAttribute("disabled"),
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="edit-dialog-backdrop">
      <button
        type="button"
        className="dialog-scrim"
        aria-label={closeLabel}
        tabIndex={-1}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="edit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="edit-dialog-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="header-login" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

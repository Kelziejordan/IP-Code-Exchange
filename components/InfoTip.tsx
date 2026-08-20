"use client";

import { useState, type ReactNode } from "react";

export function InfoTip({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="info-wrap">
      <button
        type="button"
        className="info-button"
        aria-label={`More information about ${title}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        i
      </button>
      {open && (
        <span className="info-popover" role="tooltip">
          <strong>{title}</strong>
          <span>{children}</span>
        </span>
      )}
    </span>
  );
}

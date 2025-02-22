"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export type NavItem = {
  label: string;
  icon: (active: boolean) => JSX.Element;
  href: string;
};

type BottomNavProps = {
  items: NavItem[];
};

const normalizePath = (path: string) => {
  if (path !== "/" && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
};

export const BottomNavigation: React.FC<BottomNavProps> = ({ items }) => {
  const pathname = usePathname();

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        justifyContent: "space-around",
        background: "#fff",
        borderTop: "1px solid #ddd",
        padding: "8px 0",
      }}
    >
      {items.map((item) => {
        const isActive = normalizePath(pathname) === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              color: isActive ? "#000" : "inherit",
            }}
          >
            <div style={{ marginBottom: "4px" }}>{item.icon(isActive)}</div>
            <div style={{ fontSize: "12px", textAlign: "center" }}>
              {item.label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

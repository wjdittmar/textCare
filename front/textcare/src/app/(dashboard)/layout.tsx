"use client";

import React from "react";
import { BottomNavigation, NavItem } from "@/app/components/BottomNavigation";
import {
  HomeIcon,
  HistoryIcon,
  MessagesIcon,
  AccountIcon,
} from "@/app/components/Icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styles = {
    display: "flex",
    width: "100%",
    maxWidth: "768px",
    flexDirection: "column",
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      icon: (active) => <HomeIcon active={active} />,
      href: "/home",
    },
    {
      label: "Messages",
      icon: (active) => <MessagesIcon active={active} />,
      href: "/messages",
    },
    {
      label: "History",
      icon: (active) => <HistoryIcon active={active} />,
      href: "/history",
    },
    {
      label: "Account",
      icon: (active) => <AccountIcon active={active} />,
      href: "/account",
    },
  ];

  // TODO: change this layout to use the same parent component as the onboarding layout
  return (
    <div style={styles}>
      <div>{children}</div>
      <BottomNavigation items={navItems} />
    </div>
  );
}

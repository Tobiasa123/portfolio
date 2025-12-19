// src/app/config/routes.ts
import {
  FiHome,
  FiLayers,
  FiSettings,
  FiShield,
} from "react-icons/fi";

export const navItems = [
  {
    key: "home",
    href: "/dashboard",
    label: "Home",
    icon: FiHome,
  },
  {
    key: "techstack",
    href: "/dashboard/techstack",
    label: "Tech Stack",
    icon: FiLayers,
  },
  {
    key: "settings",
    href: "/dashboard/settings",
    label: "Settings",
    icon: FiSettings,
  },
  {
    key: "admin",
    href: "/dashboard/admin",
    label: "Admin",
    icon: FiShield,
    role: "admin",
  },
];

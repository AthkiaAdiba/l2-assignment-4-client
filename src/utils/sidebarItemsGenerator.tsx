import { NavLink } from "react-router-dom";

import { ReactNode } from "react";

export type TSidebar = {
  path: string;
  name: string;
  id: number;
  icon: ReactNode;
};

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  icon: ReactNode;
}[];

export const sidebarItemsGenerator = (items: TSidebar[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};

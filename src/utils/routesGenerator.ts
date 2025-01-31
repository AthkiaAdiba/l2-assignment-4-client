import { ReactNode } from "react";

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    return acc;
  }, []);

  return routes;
};

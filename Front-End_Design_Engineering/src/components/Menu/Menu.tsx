import type { ReactElement } from "react";

type MenuVariant = "default" | "footer";

const variants: Record<MenuVariant, string> = {
  default:
    "flex flex-col text-(--brand-tertiary) p-4 gap-y-6 lg:flex-row lg:gap-20",
  footer:
    "grid grid-flow-col grid-rows-3 my-4 gap-10 w-fit mx-auto text-(--brand-tertiary) lg:flex lg:items-center lg:gap-x-10 lg:m-0",
};

interface MenuProps {
  children: React.ReactNode;
  variant?: MenuVariant;
}

interface MenuItemProps {
  children: React.ReactNode;
  icon?: ReactElement;
}

export const Menu = ({ children, variant = "default" }: MenuProps) => {
  return <ul className={`${variants[variant]}`}>{children}</ul>;
};

export const MenuItem = ({ children, icon }: MenuItemProps) => {
  return (
    <li className="flex gap-1 items-center max-w-fit">
      {icon}
      <span>{children}</span>
    </li>
  );
};

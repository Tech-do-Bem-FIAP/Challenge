import type { ReactElement } from "react";

type MenuVariant = "default" | "footer";

const variants: Record<MenuVariant, string> = {
  default:
    "flex flex-col text-(--brand-tertiary) p-4 gap-y-6 lg:flex-row gap-x-10 gap-y-0 p-0 ml-10",
  footer:
    "grid grid-flow-col grid-rows-3 my-4 gap-10 w-fit mx-auto text-(--brand-tertiary) lg:flex items-center gap-x-10",
};

interface MenuProps {
  children: React.ReactNode;
  variant?: MenuVariant;
}

interface MenuItemProps {
  children: React.ReactNode;
  icon: ReactElement;
}

export const Menu = ({ children, variant = "default" }: MenuProps) => {
  return <ul className={`${variants[variant]}`}>{children}</ul>;
};

export const MenuItem = ({ children, icon }: MenuItemProps) => {
  return (
    <li>
      <a className="flex gap-1" href="">
        {icon}
        <span>{children}</span>
      </a>
    </li>
  );
};

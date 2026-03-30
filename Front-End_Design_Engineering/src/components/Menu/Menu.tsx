import type { ReactElement } from "react";

interface MenuProps {
    children: React.ReactNode;
}

interface MenuItemProps {
    children: React.ReactNode;
    icon: ReactElement;
}

export const Menu = ({children}:MenuProps) => {
    return (
        <ul>{children}</ul>
    )
}

export const MenuItem = ({children, icon}:MenuItemProps) => {
    return (
        <li>
            <a href="">
                {icon}
                <span>{children}</span>
            </a>
        </li>
    )
}
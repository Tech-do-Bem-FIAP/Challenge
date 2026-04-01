import type { ReactElement } from "react"

type CardVariant = "default" | "primary" | "secondary";

const variants: Record<CardVariant, string> = {
  default: "bg-transparent",
  primary: "bg-(--card-primary)",
  secondary: "bg-(--card-secondary)",
};

interface CardProps {
    children: ReactElement;
    variant?: CardVariant; 
}

export const Card = ({children, variant = "default"}:CardProps) => {
    return (
        <section className={`${variants[variant]} w-full px-10 py-8 my-2.5`}>
            {children}
        </section>
    )
}
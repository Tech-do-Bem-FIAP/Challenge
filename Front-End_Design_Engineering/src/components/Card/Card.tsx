import type { ReactElement } from "react";

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

export const Card = ({ children, variant = "default" }: CardProps) => {
  return (
    <section className={`${variants[variant]} w-full py-8 my-2.5`}>
      <div className="container_page">{children}</div>
    </section>
  );
};

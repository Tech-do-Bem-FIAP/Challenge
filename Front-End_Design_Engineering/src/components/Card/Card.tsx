import type { ReactElement } from "react";

type CardVariant = "default" | "primary" | "secondary" | "accent";

const variants: Record<CardVariant, string> = {
  default: "bg-white border border-gray-200 rounded-xl shadow-sm",
  primary:
    "bg-white border-l-4 border-l-(--brand-primary) border border-gray-200 rounded-xl shadow-sm",
  secondary: "bg-(--brand-secondary)",
  accent: "bg-linear-to-r from-(--brand-secondary) to-(--brand-primary)",
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

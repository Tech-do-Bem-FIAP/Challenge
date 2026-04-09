import type { ReactElement } from "react";

type CardVariant = "default" | "primary" | "secondary" | "accent";

const variants: Record<CardVariant, string> = {
  default: "bg-white border border-gray-200 rounded-xl shadow-sm",
  primary: "bg-white border-l-4 border-l-[#da345d] border border-gray-200 rounded-xl shadow-sm",
  secondary: "bg-[#641226]",
  accent: "bg-linear-to-r from-[#641226] to-[#da345d]",
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

import logo from "../../assets/logo-tech-do-bem.webp"

type LogoVariant = "default" | "secondary";

const variants: Record<LogoVariant, string> = {
  default: "w-25 h24",
  secondary: "w-50 h-50",
};

interface LogoProps {
    variant?: LogoVariant; 
}


export const Logo = ({variant = "default"}:LogoProps) => {
    return <img className={`${variants[variant]}`} src={logo} alt="Logo da plataforma ech do em composta por um dente cenográfico e a tipografia da logo." />
}
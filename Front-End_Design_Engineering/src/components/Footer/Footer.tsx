import { House, Info, Phone, Search, UsersRound } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Menu, MenuItem } from "../Menu/Menu";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-black to-[#da345d]">
      <section className="flex border-b">
        <div className="mx-auto">
          <a href="./index.html">
            <Logo variant="secondary" />
          </a>
        </div>
      </section>

      <Menu variant="footer">
        <MenuItem icon={<House />}>
          <p>Home</p>
        </MenuItem>
        <MenuItem icon={<Info />}>
          <p>Sobre</p>
        </MenuItem>
        <MenuItem icon={<Phone />}>
          <p>Contato</p>
        </MenuItem>
        <MenuItem icon={<UsersRound />}>
          <p>Quem somos</p>
        </MenuItem>
        <MenuItem icon={<Search />}>
          <p>FAQ</p>
        </MenuItem>
      </Menu>

      <section className="flex flex-col border-t text-center p-4">
        <p className="text-(--text-secondary-color)">
          {" "}
          &copy; {currentYear} Tech do Bem | Todos os direitos reservados
        </p>
        <p className="text-(--text-secondary-color)">Política de Privacidade</p>
      </section>
    </footer>
  );
};

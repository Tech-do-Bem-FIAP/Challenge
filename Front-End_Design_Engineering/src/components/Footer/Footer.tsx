import { House, Info, Phone, Search, UsersRound } from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Menu, MenuItem } from "../Menu/Menu";
import { Link } from "react-router";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-b from-black to-[#da345d]">
      <div className="lg:flex lg:flex-col container_page">
        <div className="lg:flex">
          <section className="flex border-b lg:border-b-0 lg:border-r lg:mr-10">
            <div className="mx-auto lg:mx-10">
              <a href="./index.html">
                <Logo variant="secondary" />
              </a>
            </div>
          </section>

          <Menu variant="footer">
            <MenuItem icon={<House />}>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem icon={<Info />}>
              <Link to="/about">Sobre</Link>
            </MenuItem>
            <MenuItem icon={<Phone />}>
              <Link to="/contact">Contato</Link>
            </MenuItem>
            <MenuItem icon={<UsersRound />}>
              <Link to="/who">Quem somos</Link>
            </MenuItem>
            <MenuItem icon={<Search />}>
              <Link to="/faq">FAQ</Link>
            </MenuItem>
          </Menu>
        </div>

        <div className="">
          <section className="flex flex-col border-t text-center p-4 lg:mt-1 lg:flex-row lg:justify-between lg:p-2">
            <p className="text-(--text-secondary-color)">
              {" "}
              &copy; {currentYear} Tech do Bem | Todos os direitos reservados
            </p>
            <p className="text-(--text-secondary-color)">
              Política de Privacidade
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
};

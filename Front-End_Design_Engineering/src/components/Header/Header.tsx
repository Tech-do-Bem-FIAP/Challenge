import {
  House,
  Info,
  Phone,
  Search,
  TextAlignJustify,
  UsersRound,
} from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Menu, MenuItem } from "../Menu/Menu";
import { Link } from "react-router";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-linear-to-b from-black to-[#da345d] rounded-3xl mt-5 flex flex-col container_page">
      <div className="flex justify-between items-center mx-5">
        <>
          <Logo variant="default" />
        </>
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-(--brand-tertiary) cursor-pointer max-w-26 lg:hidden"
          >
            {isOpen ? <TextAlignJustify /> : <TextAlignJustify />}
          </button>
          <div id="desktop-menu" className="hidden lg:flex">
            <Menu variant="default">
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
          <div className="hidden lg:flex">
            <Menu>
              <MenuItem>
                <Link
                  to="/login"
                  className="bg-(--brand-tertiary) border border-(--brand-Link to=''rimary) rounded-full px-5 py-3.5 text-(--brand-primary)"
                >
                  Login
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <Menu variant="default">
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
          <div className="my-4">
            <Menu>
              <MenuItem>
                <Link
                  to="/login"
                  className="bg-(--brand-tertiary) border-2 border-(--brand-primary) rounded-full px-5 py-3.5 text-(--brand-primary) lg:hidden"
                >
                  Login
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </header>
  );
};

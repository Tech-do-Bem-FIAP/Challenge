import {
  House,
  Info,
  Phone,
  Search,
  Menu as MenuIcon,
  X,
  UsersRound,
} from "lucide-react";
import { Logo } from "../Logo/Logo";
import { Menu, MenuItem } from "../Menu/Menu";
import { Link } from "react-router";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-linear-to-r from-[#641226] to-[#da345d] text-white sticky top-0 z-10 shadow-lg">
      <div className="container_page flex justify-between items-center py-3">
        <Logo variant="default" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white cursor-pointer lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>

        <div className="hidden lg:flex items-center gap-8">
          <Menu variant="default">
            <MenuItem icon={<House className="w-4 h-4" />}>
              <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
            </MenuItem>
            <MenuItem icon={<Info className="w-4 h-4" />}>
              <Link to="/about" className="hover:opacity-80 transition-opacity">Sobre</Link>
            </MenuItem>
            <MenuItem icon={<Phone className="w-4 h-4" />}>
              <Link to="/contact" className="hover:opacity-80 transition-opacity">Contato</Link>
            </MenuItem>
            <MenuItem icon={<UsersRound className="w-4 h-4" />}>
              <Link to="/who" className="hover:opacity-80 transition-opacity">Quem somos</Link>
            </MenuItem>
            <MenuItem icon={<Search className="w-4 h-4" />}>
              <Link to="/faq" className="hover:opacity-80 transition-opacity">FAQ</Link>
            </MenuItem>
          </Menu>
          <Link
            to="/login"
            className="bg-white text-[#da345d] rounded-full px-5 py-2 font-medium hover:bg-[#f1f1f1] transition-colors whitespace-nowrap"
          >
            Entrar
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden container_page pb-4 border-t border-white/20">
          <Menu variant="default">
            <MenuItem icon={<House className="w-4 h-4" />}>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </MenuItem>
            <MenuItem icon={<Info className="w-4 h-4" />}>
              <Link to="/about" onClick={() => setIsOpen(false)}>Sobre</Link>
            </MenuItem>
            <MenuItem icon={<Phone className="w-4 h-4" />}>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contato</Link>
            </MenuItem>
            <MenuItem icon={<UsersRound className="w-4 h-4" />}>
              <Link to="/who" onClick={() => setIsOpen(false)}>Quem somos</Link>
            </MenuItem>
            <MenuItem icon={<Search className="w-4 h-4" />}>
              <Link to="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
            </MenuItem>
          </Menu>
          <div className="px-4 mt-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="inline-block bg-white text-[#da345d] rounded-full px-5 py-2 font-medium"
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

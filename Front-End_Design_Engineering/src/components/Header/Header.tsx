import { House, Info, Phone, Search, TextAlignJustify, UsersRound } from "lucide-react"
import { Logo } from "../Logo/Logo"
import { Menu, MenuItem } from "../Menu/Menu";
// import { useState } from "react";

export const Header = () => {
    
    // Pesquisar como realizar a função para atualização do estado para que o menu seja aberto ou fechado. 
    // const [value, setValue] = useState(0);

    // const openMenu = () => {
    //     console.log(setValue(value + 1)); 
    // };

    return (
        <header className="bg-linear-to-b from-black to-[#da345d] rounded-3xl mt-5 flex flex-col container_page">
            <div className="flex justify-between items-center">
                <>
                    <Logo variant="default" />
                </>
                <>
                    <button className="text-(--brand-tertiary) cursor-pointer max-w-26 mr-5">
                        {<TextAlignJustify />}
                    </button>
                </>
            </div>
            
            <div className="hidden">
                <Menu variant="default">
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
                    <MenuItem>
                        <p className="bg-(--brand-tertiary) border border-(--brand-primary) rounded-full px-5 py-3.5 text-(--brand-primary)">
                        Login
                        </p>
                    </MenuItem>
                </Menu>
            </div>
        </header>
    )
}
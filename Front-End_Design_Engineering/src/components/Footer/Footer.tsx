import { Logo } from "../Logo/Logo"

export const Footer = () => {
    <footer className="">
      <section className="flex">
        <div>
          <a href="./index.html">
            <Logo/>
          </a>
        </div>     
      </section>

      {/* <Menu /> */}

      <section className="flex">
          <p>© 2025 Tech do Bem | Todos os direitos reservados</p>
          <p>Política de Privacidade</p>
      </section>
    </footer>
}
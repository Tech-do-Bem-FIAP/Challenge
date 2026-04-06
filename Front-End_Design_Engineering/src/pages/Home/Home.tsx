import {
  House,
  Info,
  Phone,
  Search,
  TextAlignJustify,
  UsersRound,
} from "lucide-react";
import { Logo } from "../../components/Logo/Logo";
import { Menu, MenuItem } from "../../components/Menu/Menu";
import { Card } from "../../components/Card/Card";
import { Footer } from "../../components/Footer/Footer";

function Home() {
  const openMenu = () => {
    // CRIAR FUNÇÃO PARA ABERTURA DE MENU ATRAVÉS DE CLASSES
  };

  return (
    <>
      <header className="bg-linear-to-b from-black to-[#da345d] rounded-3xl flex container_page">
        <Logo variant="default" />
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
        </Menu>
        <div>
          <button className="text-(--brand-tertiary)" onClick={openMenu}>
            {<TextAlignJustify />}
          </button>
          <button className="bg-(--brand-tertiary) border-2 border-(--brand-primary) rounded-full px-5 py-3.5 hidden">
            <a href="">Login</a>
          </button>
        </div>
      </header>

      <main>
        <section className="container_page my-24">
          <h1 className="title text-center font-bold">Tech do Bem</h1>
          <p className="text-2xl mb-4">
            A Tech do Bem é o apoio tecnológico que faltava para a Turma do Bem.{" "}
            <br />
            <br />
            Aqui, potencializamos o alcance das nossas mãos por meio de soluções
            humanizadas, modernas e personalizadas. <br />
            <br />
            <span className="font-bold">Nosso objetivo é claro:</span>{" "}
            transformar o modo como pessoas reais interagem com a tecnologia,
            afastando o medo de crescer mas, principalmente, de permanecer
            gigante.
          </p>
        </section>

        <section>
          <Card variant="primary">
            <>
              <h2 className="title2 mb-4">O PRIVIÉGIO DE PODER MUDAR VIDAS</h2>
              <p className="text-2xl text-(--brand-tertiary)">
                Para nós, a parceria com a Turma do Bem é mais do que uma
                relação profissional.
                <span className="font-bold">
                  {" "}
                  Acreditamos que dar nossas mãos é uma oportunidade única.
                </span>
              </p>
            </>
          </Card>

          <Card variant="secondary">
            <>
              <h2 className="title2 mb-4">A COMPAIXÃO COMO VALOR</h2>
              <p className="text-2xl text-(--brand-tertiary)">
                Compaixão é um valor inegociável. Não se trata de vender uma
                solução, mas de apresentar{" "}
                <span className="font-bold">
                  {" "}
                  um caminho que todos possam atravessar juntos.
                </span>
              </p>
            </>
          </Card>

          <Card variant="primary">
            <>
              <h2 className="title2 mb-4">A TECNOLOGIA PARA IMPULSIONAR</h2>
              <p className="text-2xl text-(--brand-tertiary)">
                Ferramentas não substituem o calor humano. Com a Tech do Bem não
                é diferente: somos human-first e não abrimos mão disso. Por
                isso, nossa maior preocupação é introduzir mudanças que sejam
                significativas, mas sem perder a familiaridade. A tecnologia,
                para nós, é isso:{" "}
                <span className="font-bold">
                  {" "}
                  propulsão para propósitos humanos.
                </span>
              </p>
            </>
          </Card>

          <Card variant="secondary">
            <div className="flex">
              <h2 className="title2 h-fit my-auto text-center">ISSO É</h2>
              <Logo variant="secondary" />
            </div>
          </Card>
        </section>

        <section className="container_page my-24 text-center">
          <h3 className="title3 font-bold mb-6">
            Porque, juntos, <br />
            somos mais fortes.
          </h3>
          <p className="text-2xl">
            Convidamos a Turma do Bem a dar este próximo passo
            <span className="font-bold"> em direção ao futuro</span>, onde mais
            sorrisos são alcançados e mais vidas são transformadas.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;

import { Footer } from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <header>
        {/* <Logo /> */}
        {/* <Menu>
          <MenuItem>
          </MenuItem>
        </Menu> */}
        <div>
          <button></button>
        </div>
      </header>

      <main>
        <section>
          <h1 className="title">Tech do Bem</h1>
          <p className="text-2xl">
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

        {/* <section>
          <Card>
            <h2 className="title2"></h2>
            <p className="container text-2xl"></p>
          </Card>
          <Card>
            <p className="container text-2xl"></p>
            <h2 className="title2"></h2>
          </Card>
          <Card>
            <h2 className="title2"></h2>
            <p className="container text-2xl"></p>
          </Card>
        </section> */}

        <section>
          <h3 className="title3">
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

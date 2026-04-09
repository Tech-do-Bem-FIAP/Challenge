import { Logo } from "../../components/Logo/Logo";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function Home() {
  return (
    <>
      <Header />

      <main className="bg-[#f1f1f1] min-h-screen">
        {/* Hero */}
        <section className="container_page py-20 text-center">
          <h1 className="title font-bold mb-6">Tech do Bem</h1>
          <p className="text-xl text-[#232323] max-w-2xl mx-auto leading-relaxed">
            A plataforma de gestão odontológica criada para a{" "}
            <span className="font-bold text-[#641226]">Turma do Bem</span> — centralizando
            pacientes, dentistas, atendimentos e comunicação em um único lugar, de forma
            gratuita e acessível.
          </p>
        </section>

        {/* Cards section */}
        <section className="space-y-0">
          <div className="bg-white border-l-4 border-l-[#da345d] border-b border-gray-100 py-10">
            <div className="container_page">
              <h2 className="title3 font-bold mb-4">O PRIVILÉGIO DE PODER MUDAR VIDAS</h2>
              <p className="text-lg text-[#232323] leading-relaxed">
                Para nós, a parceria com a Turma do Bem é mais do que uma relação profissional.{" "}
                <span className="font-bold">
                  Acreditamos que dar nossas mãos é uma oportunidade única.
                </span>
              </p>
            </div>
          </div>

          <div className="bg-linear-to-r from-[#641226] to-[#da345d] py-10">
            <div className="container_page">
              <h2 className="title2 mb-4">A COMPAIXÃO COMO VALOR</h2>
              <p className="text-xl text-[#f1f1f1] leading-relaxed">
                Compaixão é um valor inegociável. Não se trata de vender uma solução, mas de
                apresentar{" "}
                <span className="font-bold">
                  um caminho que todos possam atravessar juntos.
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white border-l-4 border-l-[#da345d] border-b border-gray-100 py-10">
            <div className="container_page">
              <h2 className="title3 font-bold mb-4">A TECNOLOGIA PARA IMPULSIONAR</h2>
              <p className="text-lg text-[#232323] leading-relaxed">
                Ferramentas não substituem o calor humano. Com a Tech do Bem não é diferente:
                somos human-first e não abrimos mão disso. A tecnologia, para nós, é isso:{" "}
                <span className="font-bold text-[#641226]">
                  propulsão para propósitos humanos.
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#f1f1f1] border-b border-gray-200 py-10">
            <div className="container_page flex justify-center items-center gap-4">
              <h2 className="title2 h-fit my-auto text-center">ISSO É</h2>
              <Logo variant="secondary" />
            </div>
          </div>
        </section>

        {/* CTA bottom */}
        <section className="container_page py-20 text-center">
          <h3 className="title3 font-bold mb-6">
            Porque, juntos, <br />
            somos mais fortes.
          </h3>
          <p className="text-lg text-[#232323] max-w-xl mx-auto leading-relaxed">
            Convidamos a Turma do Bem a dar este próximo passo{" "}
            <span className="font-bold">em direção ao futuro</span>, onde mais sorrisos são
            alcançados e mais vidas são transformadas.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;

import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function About() {
  return (
    <>
      <Header />

      <main className="bg-[#f1f1f1] min-h-screen">
        <section className="container_page py-16">
          <h1 className="title font-bold mb-8">Sobre a Tech do Bem</h1>

          <div className="bg-white border border-gray-200 border-l-4 border-l-[#da345d] rounded-xl shadow-sm p-8 space-y-5">
            <p className="text-base text-[#232323] leading-relaxed">
              A Tech do Bem surgiu para otimizar a gestão e o acompanhamento de atendimentos
              da Turma do Bem. Com foco na organização e eficiência, o sistema oferece ferramentas
              completas para a gestão interna das informações da ONG, monitoramento de pacientes
              e gestão de profissionais voluntários.
            </p>
            <p className="text-base text-[#232323] leading-relaxed">
              Entre suas principais funcionalidades estão a adição e manutenção de pacientes —
              possibilitando o cadastro, atualização e acompanhamento individual de cada pessoa
              atendida — e a gestão de dentistas e colaboradores, facilitando o controle das equipes
              envolvidas e a distribuição das atividades.
            </p>
            <p className="text-base text-[#232323] leading-relaxed">
              O sistema oferece controle detalhado dos atendimentos realizados, em andamento e a
              iniciar, permitindo uma visão clara do progresso de cada caso. Além disso, promove a
              centralização das informações recebidas, garantindo maior segurança, transparência e
              integração entre os dados — eliminando o uso de planilhas, papéis avulsos e
              comunicação dispersa.
            </p>
            <p className="text-base text-[#232323] leading-relaxed">
              Visando o futuro, a Tech do Bem planeja agregar ferramentas baseadas em Inteligência
              Artificial para otimizar processos lentos e burocráticos, devolvendo o precioso tempo
              que os colaboradores da Turma do Bem perdem com tais atividades.
            </p>
            <p className="text-base font-medium text-[#641226] leading-relaxed">
              A Tech do Bem foi criada para tornar os processos mais simples e conectados, unindo
              tecnologia e propósito social para gerar impacto real e transformar vidas.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;

import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";

function About() {
  return (
    <>
      <Header/>

      <main >
        <section className="container_page my-10">
          <h1 className="title font-bold">Tech do Bem</h1>
          <p className="text-2xl mb-4">
            A Tech do Bem surgiu para otimizar a gestão e o acompanhamento de atendimentos do Turma do Bem. Com foco na organização e eficiência, o sistema oferece ferramentas completas não apenas para a gestão interna das informações da Turma do Bem, mas também para o monitoramento de pacientes e gestão de profissionais voluntários. <br /> <br />
            Entre suas principais funcionalidades, estão a adição e manutenção de pacientes, possibilitando o cadastro, atualização e acompanhamento individual de cada pessoa atendida. Também permite a adição e manutenção de dentistas e colaboradores, facilitando o controle das equipes envolvidas e a distribuição das atividades. <br /> <br />
            O sistema oferece, ainda, o controle detalhado dos tratamentos realizados, em andamento e a iniciar, permitindo uma visão clara do progresso de cada caso. Além disso, promove a centralização das informações recebidas, garantindo maior segurança, transparência e integração entre os dados. <br /> <br />
            Visando o futuro, a Tech do Bem agrega ferramentas baseadas em Inteligência Artificial para otimizar processos lentos e burocráticos, devolvendo o precioso tempo que os colaboradores da Turma do Bem perdem com tais atividades. <br /> <br />
            A Tech do Bem foi criado para tornar os processos mais simples e conectados, unindo tecnologia e propósito social para gerar impacto real e transformar vidas.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
